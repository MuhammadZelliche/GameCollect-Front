import { defineStore } from 'pinia';
import axios from 'axios';

// Base API URL
// Assure-toi que c'est bien l'URL de ton back .NET
const API_BASE_URL = 'http://localhost:8080/api'; 

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: [],
    loading: false,
    error: null,
    hasMore: true // Nouveau : pour savoir si on peut encore scroller
  }),

  actions: {
    // params contient : page, pageSize, search, platform, rarity, sort
    // reset est true quand on change un filtre (on vide la liste), false quand on scroll (on ajoute à la suite)
    async fetchGames(params = {}, reset = false) {
      if (this.loading) return;
      
      this.loading = true;
      this.error = null;

      if (reset) {
        this.games = [];
        this.hasMore = true;
      }

      try {
        // Axios gère automatiquement la création de l'URL query string
        // Ex: /api/games?page=1&pageSize=20&search=mario
        const response = await axios.get(`${API_BASE_URL}/games`, { params });
        
        const rawGames = response.data;

        // Si on reçoit moins de jeux que demandé (ex: on demande 20, on en reçoit 5),
        // c'est qu'on est à la fin de la base de données.
        if (rawGames.length < (params.pageSize || 20)) {
          this.hasMore = false;
        }

        // Mapping (On garde ta logique de mapping)
        const mappedGames = rawGames.map(g => ({
          gameId: g.id, 
          titre: g.titre,
          plateforme: g.plateforme,
          anneeSortie: g.anneeSortie,
          imageUrl: g.imageUrl,
          rarete: g.rarete || 'Unknown',
          userGames: g.userGames || [],
          reviews: g.reviews || []
        }));

        if (reset) {
          this.games = mappedGames; // On remplace tout
        } else {
          this.games = [...this.games, ...mappedGames]; // On ajoute à la suite
        }

      } catch (error) {
        console.error('Failed to fetch games:', error);
        this.error = error.message;
        // En cas d'erreur, on ne vide pas forcément la liste si on était juste en train de scroller
        if (reset) this.games = []; 
      } finally {
        this.loading = false;
      }
    },

    async getGameById(id) {
      try {
        const response = await axios.get(`${API_BASE_URL}/games/${id}`);
        const g = response.data;
        
        // Mapping identique à ton ancien code pour garder la compatibilité
        // Vérification si format DTO ou Model brut
        const gameId = g.id !== undefined ? g.id : g.gameId;
        
        return {
          gameId: gameId,
          titre: g.titre,
          plateforme: g.plateforme,
          anneeSortie: g.anneeSortie,
          imageUrl: g.imageUrl,
          rarete: g.rarete || 'Unknown',
          userGames: g.userGames || [],
          reviews: g.reviews || []
        };
      } catch (err) {
        console.error('Failed to fetch game:', err);
        return null;
      }
    }
  }
});