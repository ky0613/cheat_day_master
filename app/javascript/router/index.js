import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import TopIndex from "../pages/top/index.vue";
import MealOut from "../pages/meal/MealOut.vue";
import MealHome from "../pages/meal/MealHome.vue";
import MealOutResult from "../pages/result/MealOutResult.vue";
import MealHomeResult from "../pages/result/MealHomeResult.vue";
import TheTerms from "../pages/static/TheTerms.vue";
import ThePolicy from "../pages/static/ThePolicy.vue";
import LoginIndex from "../pages/login/index.vue";
import RegisterIndex from "../pages/register/index.vue";
import BookmarkIndex from "../pages/bookmark/index.vue";
import oauthCallback from "../pages/login/oauthCallback.vue";
import ResetPasswordCreate from "../pages/reset_password/ResetPasswordCreate.vue";
import ResetPasswordUpdate from "../pages/reset_password/ResetPasswordUpdate.vue";

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
      name: "TheTerms",
      component: TheTerms,
    },
    {
      path: "/policy",
      name: "ThePolicy",
      component: ThePolicy,
    },
    {
      path: "/oauth/callback",
      name: "oauthCallback",
      component: oauthCallback,
    },
    {
      path: "/users/password_resets",
      name: "ResetPasswordCreate",
      component: ResetPasswordCreate,
    },
    {
      path: "/users/password/edit",
      name: "ResetPasswordUpdate",
      component: ResetPasswordUpdate,
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
