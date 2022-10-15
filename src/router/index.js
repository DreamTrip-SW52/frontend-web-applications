import { createRouter, createWebHashHistory } from 'vue-router';
import Initial from '../views/Initial.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import PackageDetails from '../views/PackageDetails.vue';
import Packages from '../views/Packages.vue';
import Statistics from '../views/Statistics.vue'

const routes = [
  {
    path: '/',
    name: 'initial',
    component: Initial,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/package/:id',
    component: PackageDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/packages',
    component: Packages,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    component: Statistics,
    meta: { requiresAuth: true }
  },
  // crear para cualquier ruta que no exista y redirigir a la ruta inicial
  // { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
