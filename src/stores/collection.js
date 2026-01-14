import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

const API_BASE_URL = 'http://localhost:8080/api';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collection: [],
    loading: false
  }),
  actions: {
    async fetchCollection() {
      this.loading = true;
      try {
        // Utiliser le nouvel endpoint /api/usergames
        const response = await axios.get(`${API_BASE_URL}/usergames`);
        this.collection = response.data;
      } catch (err) {
        console.error("Failed to fetch collection", err);
        this.collection = [];
      } finally {
        this.loading = false;
      }
    },
    async addToCollection(gameId) {
      try {
        await axios.post(`${API_BASE_URL}/usergames`, { gameId });
        await this.fetchCollection(); // Rafraîchir la collection
        return true;
      } catch (err) {
        console.error("Add failed", err);
        throw err; // Propager l'erreur pour affichage dans l'UI
      }
    },
    async removeFromCollection(gameId) {
      try {
        await axios.delete(`${API_BASE_URL}/usergames/${gameId}`);
        // Mise à jour optimiste
        this.collection = this.collection.filter(ug => ug.gameId !== gameId);
        return true;
      } catch (err) {
        console.error("Remove failed", err);
        throw err; // Propager l'erreur pour affichage dans l'UI
      }
    },
    isInCollection(gameId) {
      return this.collection.some(ug => ug.gameId === gameId);
    }
  }
});
