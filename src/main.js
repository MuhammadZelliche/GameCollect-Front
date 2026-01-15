import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const pinia = createPinia()
const app = createApp(App)

// 1. Configure Global Axios Interceptor
import axios from 'axios';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 2. Configure Response Interceptor for 401
axios.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    // Clear auth and redirect
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
