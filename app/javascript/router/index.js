import Vue from "vue";
import Router from "vue-router";

import TopIndex from "../pages/top/index.vue";
import MealOut from "../pages/meal/MealOut.vue";
import MealHome from "../pages/meal/MealHome.vue";
import MealOutResult from "../pages/result/MealOutResult.vue";
import MealHomeResult from "../pages/result/MealHomeResult.vue";
import Terms from "../pages/static/Terms.vue";
import Policy from "../pages/static/Policy.vue";
import LoginIndex from "../pages/login/index.vue";
import RegisterIndex from "../pages/register/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
      path: "/",
      name: "TopIndex",
      component: TopIndex,
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
  ],
});

// Router.beforeEach((to, from, next) => {
//   store.dispatch("users/fetchAuthUser").then((authUser) => {
//     if (to.matched.some((record) => record.meta.requiredAuth) && !authUser) {
//       next({ name: "LoginIndex" });
//     } else {
//       next();
//     }
//   });
// });
