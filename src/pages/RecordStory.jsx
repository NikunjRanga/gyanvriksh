/**
 * Record Story Page
 * Complete flow for recording and capturing stories
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { Section } from '../components/templates';
import { VoiceRecorder, VideoRecorder, StoryCaptureForm } from '../components/recording';
import { Button } from '../components/ui';
import { ArrowLeft, Upload } from 'lucide-react';

const RecordStory = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('select'); // select, record, form
  const [mediaType, setMediaType] = useState(null); // 'audio' or 'video'
  const [mediaBlob, setMediaBlob] = useState(null);

  const handleMediaTypeSelect = (type) => {
    setMediaType(type);
    setStep('record');
  };

  const handleRecordingComplete = (blob) => {
    setMediaBlob(blob);
    setStep('form');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setMediaType('audio');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      }
      setMediaBlob(file);
      setStep('form');
    }
  };

  const handleSaveStory = (storyData) => {
    // TODO: Save to backend/state management
    console.log('Story saved:', storyData);
    alert('Story saved successfully!');
    navigate('/dashboard');
  };

  const handleCancel = () => {
    setStep('select');
    setMediaType(null);
    setMediaBlob(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-neutral-light">
        <Section background="gradient" padding="py-12">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Button>
          </div>
        </Section>

        {step === 'select' && (
          <Section background="neutral-light">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                How would you like to capture this story?
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Choose a recording method or upload existing media
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => handleMediaTypeSelect('audio')}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Record Audio</h3>
                  <p className="text-gray-600 text-sm">
                    Capture voice stories with high-quality audio recording
                  </p>
                </button>

                <button
                  onClick={() => handleMediaTypeSelect('video')}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Record Video</h3>
                  <p className="text-gray-600 text-sm">
                    Record video stories with audio and visual elements
                  </p>
                </button>

                <label className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Media</h3>
                  <p className="text-gray-600 text-sm">
                    Upload existing audio or video files from your device
                  </p>
                </label>
              </div>
            </div>
          </Section>
        )}

        {step === 'record' && (
          <Section background="neutral-light">
            <div className="max-w-4xl mx-auto">
              {mediaType === 'audio' ? (
                <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
              ) : (
                <VideoRecorder onRecordingComplete={handleRecordingComplete} />
              )}
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </Section>
        )}

        {step === 'form' && (
          <Section background="neutral-light" padding="py-12">
            <StoryCaptureForm
              mediaBlob={mediaBlob}
              mediaType={mediaType}
              onSave={handleSaveStory}
              onCancel={handleCancel}
            />
          </Section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RecordStory;

