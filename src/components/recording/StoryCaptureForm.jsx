/**
 * Story Capture Form Component
 * Form for capturing story metadata and guided prompts
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import { Container } from '../ui';

const StoryCaptureForm = ({ 
  mediaBlob, 
  mediaType, 
  onSave, 
  onCancel, 
  loading = false,
  initialData = null,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    elderName: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    description: '',
    prompt: '',
  });

  // Load initial data if provided (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        elderName: initialData.elderName || '',
        date: initialData.date 
          ? new Date(initialData.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        tags: Array.isArray(initialData.tags) 
          ? initialData.tags.join(', ')
          : initialData.tags || '',
        description: initialData.description || '',
        prompt: initialData.prompt || '',
      });
    }
  }, [initialData]);

  const guidedPrompts = [
    'Tell us about a significant life event that shaped who you are today.',
    'Share a story about your childhood or family traditions.',
    'What is the most important lesson you learned from your parents or grandparents?',
    'Describe a challenge you overcame and how you did it.',
    'Tell us about your career journey and key decisions you made.',
    'Share wisdom or advice you would give to future generations.',
    'What cultural traditions or practices are important to you?',
    'Tell us about a person who greatly influenced your life.',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePromptSelect = (prompt) => {
    setFormData((prev) => ({
      ...prev,
      prompt: prompt,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        mediaBlob,
        mediaType,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      });
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {isEditMode ? 'Edit Story Details' : 'Story Details'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Grandfather's Journey to the City"
            />
          </div>

          {/* Elder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storyteller Name *
            </label>
            <input
              type="text"
              name="elderName"
              value={formData.elderName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Grandfather Ram"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Recorded *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Guided Prompts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggested Prompts (Click to select)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {guidedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePromptSelect(prompt)}
                  className={`text-left p-3 rounded-lg text-sm transition-colors ${
                    formData.prompt === prompt
                      ? 'bg-primary text-white'
                      : 'bg-neutral-light hover:bg-neutral text-gray-700'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Prompt or Question
            </label>
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter a custom question or prompt for the storyteller..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add any additional notes or context about this story..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., family, tradition, career, wisdom"
            />
          </div>

          {/* Media Info */}
          {mediaBlob && (
            <div className="bg-neutral-light p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Media Type:</strong> {mediaType === 'audio' ? 'Audio' : 'Video'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>File Size:</strong> {(mediaBlob.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Show existing media in edit mode */}
          {isEditMode && initialData?.mediaUrl && (
            <div className="bg-neutral-light p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Current Media:</strong> {mediaType === 'audio' ? 'Audio' : 'Video'} file
              </p>
              {mediaType === 'audio' ? (
                <audio controls src={initialData.mediaUrl} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <video controls src={initialData.mediaUrl} className="w-full max-h-64">
                  Your browser does not support the video element.
                </video>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Note: Media cannot be changed in edit mode. Delete and recreate to change media.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
              disabled={loading}
            >
              {loading ? (loading === 'uploading' ? 'Uploading...' : 'Saving...') : 'Save Story'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </Container>
  );
};

export default StoryCaptureForm;


