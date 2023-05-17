import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AddView from "@/views/AddView.vue";
import { auth } from "@/firebase/firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// Router Guard for Authentication
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(function (user) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }

    if (to.matched.some((record) => record.meta.hideForAuth)) {
      if (user) {
        next({ path: "/online" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
