import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import TopIndex from "../pages/top/index.vue";
import MealOut from "../pages/meal/MealOut.vue";
import MealHome from "../pages/meal/MealHome.vue";
import MealOutResult from "../pages/result/MealOutResult.vue";
import MealHomeResult from "../pages/result/MealHomeResult.vue";
import Terms from "../pages/static/Terms.vue";
import Policy from "../pages/static/Policy.vue";
import LoginIndex from "../pages/login/index.vue";
import RegisterIndex from "../pages/register/index.vue";
import BookmarkIndex from "../pages/bookmark/index.vue";
import oauthCallback from "../pages/login/oauthCallback.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "TopIndex",
      component: TopIndex,
    },
    {
      path: "/login",
      name: "LoginIndex",
      component: LoginIndex,
    },
    {
      path: "/register",
      name: "RegisterIndex",
      component: RegisterIndex,
    },
    {
      path: "/bookmarks",
      name: "BookmarkIndex",
      component: BookmarkIndex,
    },
    {
      path: "/meal-out",
      name: "MealOut",
      component: MealOut,
    },
    {
      path: "/meal-home",
      name: "MealHome",
      component: MealHome,
    },
    {
      path: "/meal-out/result",
      name: "MealOutResult",
      component: MealOutResult,
    },
    {
      path: "/meal-home/result",
      name: "MealHomeResult",
      component: MealHomeResult,
    },
    {
      path: "/terms",
      name: "Terms",
      component: Terms,
    },
    {
      path: "/policy",
      name: "Policy",
      component: Policy,
    },
    {
      path: "/oauth/callback",
      name: "oauthCallback",
      component: oauthCallback,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchAuthUser").then((authUser) => {
    if (to.matched.some((record) => record.meta.requiredAuth) && !authUser) {
      next({ name: "LoginIndex" });
    } else {
      next();
    }
  });
});

export default router;
