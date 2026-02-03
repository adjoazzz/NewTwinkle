// src/services/api.js

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const pinterestAPI = {
  scrapeBoard: async (url, limit = 20) => {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/api/scrape/`);
      
      const response = await fetch(`${API_BASE_URL}/api/scrape/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, limit })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch images');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.error('API Health Check Failed:', error);
    return false;
  }
};