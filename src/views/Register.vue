<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">{{ $t('auth.registerTitle') }}</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">{{ $t('auth.username') }}</label>
            <input id="username" name="username" type="text" required="" v-model="username" class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" :placeholder="$t('auth.username')" />
          </div>
          <div>
            <label for="email-address" class="sr-only">{{ $t('auth.email') }}</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="email" class="relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" :placeholder="$t('auth.email')" />
          </div>
          <div>
            <label for="password" class="sr-only">{{ $t('auth.password') }}</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required="" v-model="password" class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" :placeholder="$t('auth.password')" />
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ $t('auth.registerButton') }}
          </button>
        </div>
        <div v-if="error" class="text-red-500 text-center text-sm">
            {{ error }}
        </div>
      </form>
       <div class="text-center">
        <router-link to="/login" class="font-medium text-indigo-400 hover:text-indigo-300">{{ $t('auth.hasAccount') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  error.value = '';
  try {
    await authStore.register(username.value, email.value, password.value);
    router.push('/games');
  } catch (e) {
      if (e.response && e.response.data) {
          if (e.response.data.errors) {
              const errors = e.response.data.errors;
              error.value = Object.values(errors).flat().join('\n');
          } else if (e.response.data.message) {
               error.value = e.response.data.message;
          } else {
              error.value = typeof e.response.data === 'string' ? e.response.data : t('auth.registerError');
          }
      } else {
          error.value = t('auth.registerError');
      }
  }
};
</script>
