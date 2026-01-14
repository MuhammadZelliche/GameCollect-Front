<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">My Collection</h1>

    <div v-if="collectionStore.loading" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
    </div>

    <div v-else-if="collectionStore.collection.length === 0" class="text-center py-20 bg-gray-800 rounded-lg">
        <p class="text-xl text-gray-300 mb-4">You haven't added any games yet.</p>
        <router-link to="/games" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Browse Games
        </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="item in collectionStore.collection" :key="item.userGameId" class="bg-gray-800 rounded-lg overflow-hidden shadow-lg group relative">
            <img :src="item.imageUrl" :alt="item.title" class="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity">
            <div class="p-4">
                <h3 class="text-xl font-bold text-white truncate">{{ item.title }}</h3>
                <div class="flex justify-between items-center mt-2 text-sm text-gray-400">
                    <span>{{ item.platform }}</span>
                    <span>Added: {{ new Date(item.dateAjout).toLocaleDateString() }}</span>
                </div>
                <!-- Note functionality could go here -->
                 <div class="mt-4 flex justify-between">
                     <router-link :to="`/games/${item.gameId}`" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View</router-link>
                     
                     <button @click="remove(item.gameId)" class="text-red-400 hover:text-red-300 text-sm font-medium">Remove</button>
                 </div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCollectionStore } from '../stores/collection';

const collectionStore = useCollectionStore();

onMounted(() => {
    collectionStore.fetchCollection();
});

const remove = async (gameId) => {
    if(confirm('Are you sure you want to remove this game from your collection?')) {
        await collectionStore.removeFromCollection(gameId);
    }
};
</script>
