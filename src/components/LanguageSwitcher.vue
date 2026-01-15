<template>
  <div class="flex items-center gap-1">
    <button
      @click="setLang('fr')"
      :class="['px-2 py-1 rounded text-sm font-medium transition-colors',
               locale === 'fr' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700']"
    >
      FR
    </button>
    <button
      @click="setLang('en')"
      :class="['px-2 py-1 rounded text-sm font-medium transition-colors',
               locale === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700']"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()

const setLang = (lang) => {
  setLocale(lang)
}
</script>
