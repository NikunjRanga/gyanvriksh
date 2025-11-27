/**
 * Stories Preview Component
 * Shows a preview of recent stories on dashboard
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoriesStore } from '../../store';
import { Play, Calendar, User } from 'lucide-react';

const StoriesPreview = () => {
  const navigate = useNavigate();
  const { stories, loading, fetchStories } = useStoriesStore();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-8 bg-neutral-light rounded-xl">
        <p className="text-gray-600 mb-4">No stories yet. Start recording your first story!</p>
      </div>
    );
  }

  const recentStories = stories.slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {recentStories.map((story) => (
        <div
          key={story.id}
          className="bg-neutral-light p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate('/stories')}
        >
          <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{story.title}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{story.elderName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(story.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoriesPreview;

