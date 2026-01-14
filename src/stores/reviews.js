import { defineStore } from 'pinia';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [],
    loading: false
  }),
  actions: {
    async fetchReviews() {
      this.loading = true;
      try {
        const response = await axios.get(API_ENDPOINTS.reviews.base);
        this.reviews = response.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addReview(review) {
      try {
        const response = await axios.post(API_ENDPOINTS.reviews.base, review);
        this.reviews.push(response.data);
        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getReviewsByGameId(gameId) {
      return this.reviews.filter(r => r.gameId === gameId).sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));
    }
  }
});
