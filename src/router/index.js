import { createRouter, createWebHashHistory } from 'vue-router';
import Initial from '../views/Initial.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import PackageDetails from '../views/PackageDetails.vue';
import CustomPackage from '../views/CustomPackage.vue';
import AgencySignUp from '../views/AgencySignUp.vue';
import AgencyLogin from '../views/AgencyLogin.vue';
import TransportForm from '../components/custom_package/TransportForm.vue';
import AccommodationForm from '../components/custom_package/AccommodationForm.vue';
import TourForm from '../components/custom_package/TourForm.vue';
import RentCarForm from '../components/custom_package/RentCarForm.vue';
import NotFound from '../views/NotFound.vue';

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
    path: '/custom-packages',
    component: CustomPackage,
    children: [
      {
        path: '',
        component: TransportForm,
        meta: { requiresAuth: true },
      },
      {
        path: 'accommodation',
        component: AccommodationForm,
        meta: { requiresAuth: true },
      },
      {
        path: 'tour',
        component: TourForm,
        meta: { requiresAuth: true },
      },
      {
        path: 'rent',
        component: RentCarForm,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/agency',
    children: [
      {
        path: 'signup',
        component: AgencySignUp,
        meta: { requiresAuth: false },
      },
      {
        path: 'login',
        component: AgencyLogin,
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;