// Configuration de l'API
// En développement local: http://localhost:5159
// Avec Docker: http://localhost:8080
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`
  },
  games: {
    base: `${API_BASE_URL}/api/games`,
    byId: (id) => `${API_BASE_URL}/api/games/${id}`
  },
  reviews: {
    base: `${API_BASE_URL}/api/reviews`,
    byId: (id) => `${API_BASE_URL}/api/reviews/${id}`
  },
  users: {
    base: `${API_BASE_URL}/api/users`,
    byId: (id) => `${API_BASE_URL}/api/users/${id}`
  }
};