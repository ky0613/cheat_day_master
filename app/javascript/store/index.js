import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import rakutenItems from "./modules/rakutenItems";
import rakutenRecipes from "./modules/rakutenRecipes";
import googleMealOutStores from "./modules/googleMealOutStores";
import googleMealHomeStores from "./modules/googleMealHomeStores";
import users from "./modules/users";
import stores from "./modules/stores";
import items from "./modules/items";
import recipes from "./modules/recipes";
import flash from "./modules/flash";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rakutenItems,
    rakutenRecipes,
    googleMealOutStores,
    googleMealHomeStores,
    users,
    stores,
    items,
    recipes,
    flash,
  },
  plugins: [
    createPersistedState({
      key: "cheatDayMaster",
      paths: [
        "googleMealOutStores",
        "googleMealHomeStores",
        "rakutenItems",
        "rakutenRecipes",
      ],
    }),
  ],
});
