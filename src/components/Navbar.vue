<template>
  <nav class="bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="text-xl font-bold text-indigo-500">GameCollect</span>
          </div>
          <div v-if="authStore.isAuthenticated" class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/games" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" active-class="bg-gray-900 text-white">{{ $t('nav.games') }}</router-link>
              <router-link to="/collection" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" active-class="bg-gray-900 text-white">{{ $t('nav.collection') }}</router-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 space-x-4">
            <LanguageSwitcher />
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
               <span class="text-gray-300 text-sm">{{ $t('nav.hello') }}, {{ authStore.user?.username }}</span>
               <button @click="logout" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{ $t('nav.logout') }}</button>
            </div>
            <div v-else class="flex space-x-4">
                <router-link to="/login" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{ $t('nav.login') }}</router-link>
                <router-link to="/register" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">{{ $t('nav.register') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import LanguageSwitcher from './LanguageSwitcher.vue';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
    authStore.logout();
    router.push('/login');
};
</script>
