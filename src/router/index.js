import { createRouter, createWebHashHistory } from "vue-router";
import InitialView from "../views/InitialView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import PackageDetails from "../views/PackageDetails.vue";

const routes = [
  { path: "/", name: "initial", component: InitialView },
  { path: "/signup", name: "signup", component: SignUpView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/home", name: "home", component: HomeView },
  {
    path: "/package",
    name: "package",
    component: PackageDetails,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
