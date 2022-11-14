import { createRouter, createWebHashHistory } from "vue-router";
import Initial from "../views/Initial.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import PackageDetails from "../views/PackageDetails.vue";
import CustomPackage from "../views/CustomPackage.vue";
import EconomicFollow from "../views/EconomicFollow.vue";
import SecurityInformation from "../views/SecurityInformation.vue";
import AgencySignUp from "../views/AgencySignUp.vue";
import AgencyLogin from "../views/AgencyLogin.vue";
import TransportForm from "../components/custom_package/TransportForm.vue";
import AccommodationForm from "../components/custom_package/AccommodationForm.vue";
import TourForm from "../components/custom_package/TourForm.vue";
import RentCarForm from "../components/custom_package/RentCarForm.vue";
import NotFound from "../views/NotFound.vue";
import MyPackages from "../views/MyPackages.vue";
import Statistics from "../views/Statistics.vue";
import Additionaldata from "../views/Additionaldata.vue";
import TypeOfUser from "../views/TypeOfUser.vue";
import Profile from "../views/Profile.vue";
import PayPackage from "../views/PayPackage.vue";
import BuyPackage from "../views/BuyPackage.vue";
import PublishServices from "../views/PublishServices.vue";

const routes = [
  {
    path: "/",
    name: "typeofuser",
    component: TypeOfUser,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/additionaldata",
    component: Additionaldata,
    meta: { requiresAuth: false },
  },
  {
    path: "/initial",
    component: Initial,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/package/:id",
    component: PackageDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/custom-packages",
    component: CustomPackage,
    children: [
      {
        path: "",
        component: TransportForm,
        meta: { requiresAuth: true },
      },
      {
        path: "accommodation",
        component: AccommodationForm,
        meta: { requiresAuth: true },
      },
      {
        path: "tour",
        component: TourForm,
        meta: { requiresAuth: true },
      },
      {
        path: "rent",
        component: RentCarForm,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/economic-follow",
    component: EconomicFollow,
    meta: { requiresAuth: true },
  },
  {
    path: "/security",
    component: SecurityInformation,
    meta: { requiresAuth: true },
  },
  {
    path: "/paypackage/:id",
    component: PayPackage,
    meta: { requiresAuth: true },
  },
  {
    path: "/buypackage/:id",
    component: BuyPackage,
    meta: { requiresAuth: true },
  },
  {
    path: "/agency",
    children: [
      {
        path: "initial",
        component: Initial,
        meta: { requiresAuth: false },
      },
      {
        path: "signup",
        component: AgencySignUp,
        meta: { requiresAuth: false },
      },
      {
        path: "login",
        component: AgencyLogin,
        meta: { requiresAuth: false },
      },
      {
        path: "mypackages",
        component: MyPackages,
        meta: { requiresAuth: true },
      },
      {
        path: "statistics/:id",
        component: Statistics,
        meta: { requiresAuth: true },
      },
      {
        path: "publishservices",
        component: PublishServices,
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        component: Profile,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
