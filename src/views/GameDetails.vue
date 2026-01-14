<template>
  <div v-if="loading" class="text-center py-20">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
  </div>

  <div v-else-if="!game" class="text-center py-20 text-red-500">
      Game not found.
  </div>

  <div v-else class="bg-gray-800 rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto my-8">
      
      <div class="w-full h-[500px] bg-gray-900 relative flex justify-center items-center overflow-hidden">
          
          <div class="absolute inset-0 bg-cover bg-center opacity-30 blur-lg scale-110" 
               :style="{ backgroundImage: `url(${game.imageUrl})` }">
          </div>

          <img :src="game.imageUrl" 
               :alt="game.titre" 
               class="relative z-10 h-full w-full object-contain shadow-2xl"
          >
      </div>

      <div class="p-8">
          
          <div class="flex flex-col md:flex-row justify-between items-start border-b border-gray-700 pb-6 mb-8">
              <div>
                  <h1 class="text-5xl font-bold text-white mb-4">{{ game.titre }}</h1>
                  <div class="text-gray-300 text-xl flex items-center space-x-4">
                      <span class="bg-gray-700 px-4 py-1 rounded-lg text-white font-medium">{{ game.plateforme }}</span>
                      <span class="text-gray-500">•</span>
                      <span>{{ game.anneeSortie }}</span>
                  </div>
              </div>
              
              <span :class="getRarityColor(game.rarete)" class="mt-4 md:mt-0 px-6 py-2 rounded-full text-lg font-bold bg-opacity-20 border-2 border-current">
                  {{ game.rarete }}
              </span>
          </div>

          <div class="mb-12">
              <button 
                @click="toggleCollection"
                :class="isInCollection ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                class="w-full md:w-auto px-8 py-4 rounded-lg font-bold text-white text-lg transition-all transform hover:scale-105 flex justify-center items-center space-x-3 shadow-lg"
                :disabled="actionLoading"
              >
                  <span v-if="actionLoading" class="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>
                      {{ isInCollection ? 'Retirer de ma collection' : 'Ajouter à ma collection' }}
                  </span>
              </button>
          </div>

          <div v-if="game.gameId" class="bg-gray-900 rounded-xl p-6 md:p-8">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-3xl font-bold text-white">Avis de la communauté</h3>
                    <div v-if="gameReviews.length > 0" class="px-4 py-2 bg-indigo-600 rounded-full text-white font-bold shadow">
                        ★ {{ averageRating }} / 5 <span class="text-indigo-200 text-sm ml-2">({{ gameReviews.length }} avis)</span>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700">
                    <h4 class="text-xl font-bold text-white mb-4">Laisser un avis</h4>
                    <form @submit.prevent="submitReview">
                        <div class="mb-4">
                            <label class="block text-gray-400 text-sm font-bold mb-2">Votre note</label>
                            <div class="flex space-x-2">
                                <label v-for="n in 5" :key="n" class="cursor-pointer hover:scale-110 transition-transform">
                                    <input type="radio" :value="n" v-model="newReview.note" class="sr-only peer">
                                    <span class="text-4xl" :class="n <= newReview.note ? 'text-yellow-400' : 'text-gray-600'">★</span>
                                </label>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-400 text-sm font-bold mb-2">Votre commentaire</label>
                            <textarea 
                                    v-model="newReview.commentaire" 
                                    required
                                    rows="3" 
                                    class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600 placeholder-gray-500"
                                    placeholder="Qu'avez-vous pensé de ce jeu ?"
                            ></textarea>
                        </div>
                        <div class="text-right">
                            <button 
                                    type="submit" 
                                    :disabled="submittingReview"
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                    {{ submittingReview ? 'Envoi...' : 'Publier l\'avis' }}
                            </button>
                        </div>
                    </form>
                </div>

                <div class="space-y-4">
                    <div v-if="gameReviews.length === 0" class="text-gray-500 italic text-center py-8">Aucun avis pour le moment. Soyez le premier !</div>
                    
                    <div v-for="review in gameReviews" :key="review.reviewId" class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {{ review.username.charAt(0).toUpperCase() }}
                                </div>
                                <div class="font-bold text-white text-lg">{{ review.username }}</div>
                            </div>
                            <div class="text-yellow-400 text-sm tracking-widest bg-gray-900 px-3 py-1 rounded-full border border-gray-700">
                                {{ "★".repeat(review.note) }}<span class="text-gray-600">{{ "★".repeat(5-review.note) }}</span>
                            </div>
                        </div>
                        <p class="text-gray-300 mb-4 ml-13 pl-13 leading-relaxed border-l-2 border-gray-700 pl-4 ml-2">
                            {{ review.commentaire }}
                        </p>
                        <div class="text-xs text-gray-500 text-right">
                            Publié le {{ new Date(review.datePublication).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGamesStore } from '../stores/games';
import { useCollectionStore } from '../stores/collection';
import { useReviewsStore } from '../stores/reviews';

const route = useRoute();
const gamesStore = useGamesStore();
const collectionStore = useCollectionStore();
const reviewsStore = useReviewsStore();

const game = ref(null);
const loading = ref(true);
const actionLoading = ref(false);

const newReview = ref({ note: 5, commentaire: '' });
const submittingReview = ref(false);

onMounted(async () => {
    const paramId = route.params.id;
    const id = parseInt(paramId);
    game.value = await gamesStore.getGameById(id);
    
    if (collectionStore.collection.length === 0) {
        await collectionStore.fetchCollection();
    }
    
    // Fetch all reviews if game exists
    if(game.value && game.value.gameId) {
        await reviewsStore.fetchReviews();
    }
    
    loading.value = false;
});

const gameReviews = computed(() => {
    if(!game.value || !game.value.gameId) return [];
    return reviewsStore.getReviewsByGameId(game.value.gameId);
});

const averageRating = computed(() => {
    if(gameReviews.value.length === 0) return 0;
    const sum = gameReviews.value.reduce((acc, r) => acc + r.note, 0);
    return Math.round((sum / gameReviews.value.length) * 10) / 10;
});

const isInCollection = computed(() => {
    if (!game.value) return false;
    if (!game.value.gameId) return false;
    return collectionStore.isInCollection(game.value.gameId); 
});

const toggleCollection = async () => {
    if (!game.value || !game.value.gameId) {
        alert('Impossible d\'ajouter ce jeu à la collection: ID de jeu manquant');
        return;
    }
    
    actionLoading.value = true;
    
    try {
        if (isInCollection.value) {
            await collectionStore.removeFromCollection(game.value.gameId);
            await collectionStore.fetchCollection();
        } else {
            await collectionStore.addToCollection(game.value.gameId);
            await collectionStore.fetchCollection();
        }
    } catch (e) {
        console.error(e);
        const msg = e.response?.data?.message || e.response?.data || e.message;
        alert(`Erreur: ${msg}`);
    } finally {
        actionLoading.value = false;
    }
};

const submitReview = async () => {
    if(!newReview.value.commentaire) return;
    submittingReview.value = true;
    
    try {

        await reviewsStore.addReview({
            GameId: game.value.gameId,
            Note: newReview.value.note,
            Commentaire: newReview.value.commentaire,
        });
        
        await reviewsStore.fetchReviews();
        
        newReview.value = { note: 5, commentaire: '' };
    } catch (e) {
        console.error(e);
        const msg = e.response?.data?.message || e.response?.data || e.message;
        alert(`Failed to post review: ${msg}`);
    } finally {
        submittingReview.value = false;
    }
};

const getRarityColor = (rarity) => {
    switch(rarity) {
        case 'Commun': return 'text-green-400 bg-green-400 shadow-green-400/20 shadow-lg';
        case 'Rare': return 'text-purple-400 bg-purple-400 shadow-purple-400/20 shadow-lg';
        case 'Très Rare': return 'text-orange-400 bg-orange-400 shadow-orange-400/20 shadow-lg';
        default: return 'text-gray-400 bg-gray-400';
    }
};

</script>