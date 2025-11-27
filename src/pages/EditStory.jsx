/**
 * Edit Story Page
 * Edit an existing story
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { Section } from '../components/templates';
import { Button, Container } from '../components/ui';
import { StoryCaptureForm } from '../components/recording';
import Notification from '../components/ui/Notification';
import { ArrowLeft } from 'lucide-react';
import { useStoriesStore } from '../store';

const EditStory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchStory, updateStory, loading, error } = useStoriesStore();
  const [story, setStory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      try {
        const storyData = await fetchStory(id);
        setStory(storyData);
      } catch (err) {
        setNotification({ 
          message: err.message || 'Failed to load story', 
          type: 'error' 
        });
        setTimeout(() => navigate('/stories'), 2000);
      }
    };

    if (id) {
      loadStory();
    }
  }, [id, fetchStory, navigate]);

  const handleUpdateStory = async (storyData) => {
    try {
      setSaving(true);
      setNotification(null);

      // Update story (without re-uploading media)
      const storyPayload = {
        title: storyData.title,
        elderName: storyData.elderName,
        description: storyData.description,
        prompt: storyData.prompt,
        date: storyData.date || story.date,
        tags: storyData.tags || [],
        familyId: storyData.familyId,
      };

      await updateStory(id, storyPayload);
      
      setSaving(false);
      setNotification({ message: 'Story updated successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/stories');
      }, 1500);
    } catch (err) {
      const errorMessage = err.message || 'Failed to update story. Please try again.';
      setNotification({ message: errorMessage, type: 'error' });
      setSaving(false);
    }
  };

  if (loading && !story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-neutral-light flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading story...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <main className="flex-grow bg-neutral-light">
        <Section background="gradient" padding="py-12">
          <Container>
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/stories')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Stories
              </Button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Edit Story
            </h1>
          </Container>
        </Section>

        <Section background="neutral-light" padding="py-12">
          <Container>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <StoryCaptureForm
              initialData={{
                title: story.title,
                elderName: story.elderName,
                description: story.description,
                prompt: story.prompt,
                date: story.date,
                tags: story.tags || [],
                familyId: story.familyId,
                mediaUrl: story.mediaUrl,
                mediaType: story.mediaType,
              }}
              mediaBlob={null} // Don't allow re-uploading media in edit mode
              mediaType={story.mediaType}
              onSave={handleUpdateStory}
              onCancel={() => navigate('/stories')}
              loading={saving ? 'saving' : false}
              isEditMode={true}
            />
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default EditStory;

