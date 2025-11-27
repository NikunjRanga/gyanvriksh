/**
 * API Service
 * Centralized API communication with backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Stories API
  async getStories(filters = {}) {
    const params = new URLSearchParams();
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.familyId) params.append('familyId', filters.familyId);
    if (filters.tags) params.append('tags', filters.tags);
    
    const queryString = params.toString();
    return this.request(`/stories${queryString ? `?${queryString}` : ''}`);
  }

  async getStory(id) {
    return this.request(`/stories/${id}`);
  }

  async createStory(storyData) {
    return this.request('/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  }

  async updateStory(id, storyData) {
    return this.request(`/stories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(storyData),
    });
  }

  async deleteStory(id) {
    return this.request(`/stories/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload API
  async uploadStoryFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/upload/story`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `Upload failed! status: ${response.status}`);
    }

    return await response.json();
  }

  // Families API
  async getFamilies() {
    return this.request('/families');
  }

  // Lessons API
  async getLessons() {
    return this.request('/lessons');
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;

