<template>
  <div>
    <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 class="text-3xl font-bold text-white">Browse Games</h1>
        
        <div class="flex flex-wrap gap-4 w-full md:w-auto">
             <input 
                v-model="searchQuery" 
                @input="onSearchInput"
                type="text" 
                placeholder="Rechercher un jeu..." 
                class="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500"
            >

            <select v-model="selectedPlatform" @change="onFilterChange" class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500">
                <option value="All">Toutes Plateformes</option>
                <option value="PC (Windows)">PC (Windows)</option>
                <option value="Web Browser">Web Browser</option>
            </select>

            <select v-model="selectedRarity" @change="onFilterChange" class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500">
                <option value="All">Toutes Raretés</option>
                <option value="Commun">Commun</option>
                <option value="Rare">Rare</option>
                <option value="Très Rare">Très Rare</option>
            </select>

             <select v-model="sortOption" @change="onFilterChange" class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500">
                <option value="title">A-Z</option>
                <option value="year-desc">Plus récents</option>
                <option value="year-asc">Plus anciens</option>
            </select>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="game in gamesStore.games" :key="game.gameId" class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img :src="game.imageUrl" :alt="game.titre" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-bold text-white truncate">{{ game.titre }}</h3>
                <div class="flex justify-between items-center mt-2 text-sm text-gray-400">
                    <span>{{ game.plateforme }}</span>
                    <span>{{ game.anneeSortie }}</span>
                </div>
                <div class="mt-4 flex justify-between items-center">
                     <span :class="getRarityColor(game.rarete)" class="px-2 py-1 text-xs rounded-full bg-opacity-20">{{ game.rarete || 'N/A' }}</span>
                     <router-link :to="`/games/${game.gameId}`" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                        Détails &rarr;
                     </router-link>
                </div>
            </div>
        </div>
    </div>

    <div ref="sentinel" class="h-10 mt-10 flex justify-center items-center">
        <div v-if="gamesStore.loading" class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <div v-else-if="!gamesStore.hasMore && gamesStore.games.length > 0" class="text-gray-500">
            Fin des résultats.
        </div>
        <div v-else-if="gamesStore.games.length === 0 && !gamesStore.loading" class="text-gray-500">
            Aucun jeu trouvé.
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useGamesStore } from '../stores/games';

const gamesStore = useGamesStore();

// --- State ---
const searchQuery = ref('');
const selectedPlatform = ref('All');
const selectedRarity = ref('All');
const sortOption = ref('title');

const page = ref(1);
const pageSize = 20;
let debounceTimeout = null;

const sentinel = ref(null);
let observer = null;

const loadData = async (reset = false) => {
    if (reset) {
        page.value = 1;
    }

    await gamesStore.fetchGames({
        page: page.value,
        pageSize: pageSize,
        search: searchQuery.value,
        platform: selectedPlatform.value === 'All' ? null : selectedPlatform.value,
        rarity: selectedRarity.value === 'All' ? null : selectedRarity.value,
        sort: sortOption.value
    }, reset);

    if (!reset) {
        page.value++;
    }
};

// --- Events ---

const onSearchInput = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        loadData(true);
    }, 500);
};

const onFilterChange = () => {
    loadData(true);
};

// --- Lifecycle & Scroll ---

onMounted(() => {

    loadData(true);

    observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && gamesStore.hasMore && !gamesStore.loading) {

            loadData(false); 
        }
    }, { rootMargin: '100px' });
    
    if (sentinel.value) {
        observer.observe(sentinel.value);
    }
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// --- Utils ---
const getRarityColor = (rarity) => {
    switch(rarity) {
        case 'Commun': return 'text-green-400 bg-green-400';
        case 'Rare': return 'text-purple-400 bg-purple-400';
        case 'Très Rare': return 'text-orange-400 bg-orange-400';
        default: return 'text-gray-400 bg-gray-400';
    }
};
</script>