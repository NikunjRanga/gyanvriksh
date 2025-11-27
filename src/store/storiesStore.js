/**
 * Stories Store (Zustand)
 * Global state management for stories
 */

import { create } from 'zustand';
import { apiService } from '../services/api';

const useStoriesStore = create((set, get) => ({
  stories: [],
  loading: false,
  error: null,
  selectedStory: null,

  // Fetch all stories
  fetchStories: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const stories = await apiService.getStories(filters);
      set({ stories, loading: false });
      return stories;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch single story
  fetchStory: async (id) => {
    set({ loading: true, error: null });
    try {
      const story = await apiService.getStory(id);
      set({ selectedStory: story, loading: false });
      return story;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Create story
  createStory: async (storyData) => {
    set({ loading: true, error: null });
    try {
      const newStory = await apiService.createStory(storyData);
      set((state) => ({
        stories: [newStory, ...state.stories],
        loading: false,
      }));
      return newStory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update story
  updateStory: async (id, storyData) => {
    set({ loading: true, error: null });
    try {
      const updatedStory = await apiService.updateStory(id, storyData);
      set((state) => ({
        stories: state.stories.map((s) => (s.id === id ? updatedStory : s)),
        selectedStory: state.selectedStory?.id === id ? updatedStory : state.selectedStory,
        loading: false,
      }));
      return updatedStory;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete story
  deleteStory: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiService.deleteStory(id);
      set((state) => ({
        stories: state.stories.filter((s) => s.id !== id),
        selectedStory: state.selectedStory?.id === id ? null : state.selectedStory,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Upload file
  uploadFile: async (file) => {
    set({ loading: true, error: null });
    try {
      const result = await apiService.uploadStoryFile(file);
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear selected story
  clearSelectedStory: () => set({ selectedStory: null }),
}));

export default useStoriesStore;

