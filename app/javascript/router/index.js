import Vue from "vue";
import Router from "vue-router";

import TopIndex from "../pages/top/index.vue";
import MealOut from "../pages/meal/MealOut.vue";
import MealHome from "../pages/meal/MealHome.vue";
import MealOutResult from "../pages/result/MealOutResult.vue";
import MealHomeResult from "../pages/result/MealHomeResult.vue";
import Terms from "../pages/static/Terms.vue";
import Policy from "../pages/static/Policy.vue";
import Contact from "../pages/static/Contact.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
      path: "/result-meal-out",
      name: "MealOutResult",
      component: MealOutResult,
    },
    {
      path: "/result-meal-home",
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
      path: "/contact",
      name: "Contact",
      component: Contact,
    },
  ],
});
