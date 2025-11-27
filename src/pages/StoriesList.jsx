/**
 * Stories List Page
 * View and manage all saved stories
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { Section, SectionTitle } from '../components/templates';
import { Container, Button } from '../components/ui';
import { useStoriesStore } from '../store';
import { Play, Trash2, Edit, Calendar, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollReveal } from '../constants/animations';
import MediaPlayer from '../components/stories/MediaPlayer';

const StoriesList = () => {
  const navigate = useNavigate();
  const { stories, loading, error, fetchStories, deleteStory } = useStoriesStore();
  const [playingStory, setPlayingStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteStory(id);
      } catch (err) {
        alert('Failed to delete story: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-neutral-light">
        <Section background="gradient" padding="py-20">
          <div className="text-center max-w-4xl mx-auto">
            <SectionTitle title="Your Family Stories" size="large" />
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              All your recorded stories and family wisdom
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/record')}
            >
              Record New Story
            </Button>
          </div>
        </Section>

        <Section background="white">
          <Container>
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-600">Loading stories...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                Error: {error}
              </div>
            )}

            {!loading && !error && stories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-6">No stories yet</p>
                <Button variant="primary" onClick={() => navigate('/record')}>
                  Record Your First Story
                </Button>
              </div>
            )}

            {!loading && stories.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    {...scrollReveal}
                    transition={{ ...scrollReveal.transition, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">
                        {story.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(story.id, story.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete story"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{story.elderName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(story.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Play className="w-4 h-4" />
                        <span className="capitalize">{story.mediaType}</span>
                      </div>
                    </div>

                    {story.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {story.description}
                      </p>
                    )}

                    {story.tags && story.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setPlayingStory(story)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/stories/${story.id}/edit`)}
                        title="Edit story"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />

      {/* Media Player Modal */}
      {playingStory && (
        <MediaPlayer
          mediaUrl={playingStory.mediaUrl}
          mediaType={playingStory.mediaType}
          title={playingStory.title}
          onClose={() => setPlayingStory(null)}
        />
      )}
    </div>
  );
};

export default StoriesList;

