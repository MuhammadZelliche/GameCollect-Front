import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import GameList from '../views/GameList.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// We'll lazy load others or import them as we create them
// import GameDetails from '../views/GameDetails.vue';
// import MyCollection from '../views/MyCollection.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/games'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/games',
    name: 'games',
    component: GameList,
    meta: { requiresAuth: true }
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../views/MyCollection.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/games/:id',
    name: 'game-details',
    component: () => import('../views/GameDetails.vue'),
    meta: { requiresAuth: true },
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Ensure token is set in axios if it exists in store (persistence check)
  authStore.initializeAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
