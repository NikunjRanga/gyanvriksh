/**
 * Video Recorder Component
 * Records video using MediaRecorder API
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Square, Play, Pause, Trash2 } from 'lucide-react';
import { Button } from '../ui';

const VideoRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stream, setStream] = useState(null);

  const mediaRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording, isPaused]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);

      if (previewRef.current) {
        previewRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      videoChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        mediaStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (previewRef.current) {
        previewRef.current.srcObject = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const deleteRecording = () => {
    setVideoBlob(null);
    setVideoUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleSave = () => {
    if (videoBlob && onRecordingComplete) {
      onRecordingComplete(videoBlob);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Video Recording</h3>

      {/* Video Preview/Playback */}
      <div className="mb-6">
        {isRecording ? (
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={previewRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
            </div>
          </div>
        ) : videoBlob ? (
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full h-full"
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <Video className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        {!isRecording && !videoBlob && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-dark transition-colors"
          >
            <Video className="w-10 h-10" />
          </motion.button>
        )}

        {isRecording && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseRecording}
              className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-secondary-dark transition-colors"
            >
              {isPaused ? (
                <Play className="w-8 h-8 ml-1" />
              ) : (
                <Pause className="w-8 h-8" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition-colors"
            >
              <Square className="w-8 h-8" />
            </motion.button>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {videoBlob && (
        <div className="flex gap-4">
          <Button variant="primary" onClick={handleSave} className="flex-1">
            Save Recording
          </Button>
          <Button variant="outline" onClick={deleteRecording} className="flex-1">
            Record Again
          </Button>
        </div>
      )}

      {!isRecording && !videoBlob && (
        <p className="text-center text-gray-500 text-sm mt-4">
          Click the video icon to start recording
        </p>
      )}
    </div>
  );
};

export default VideoRecorder;

