import { defineStore } from 'pinia';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin' || state.user?.Role === 'admin', // Handle case sensitivity
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(API_ENDPOINTS.auth.login, { email, password });
        this.token = response.data.token;
        this.user = {
          id: response.data.userId,
          username: response.data.username,
          role: response.data.role
        };

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        // Set default header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register(username, email, password) {
      try {
        const response = await axios.post(API_ENDPOINTS.auth.register, { username, email, password });
        this.token = response.data.token;
        this.user = {
          id: response.data.userId,
          username: response.data.username,
          role: response.data.role
        }

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },
    initializeAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    }
  },
});
