import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import rakutenItems from "./modules/rakutenItems";
import rakutenRecipes from "./modules/rakutenRecipes";
import hotPepperGourmandStores from "./modules/hotPepperGourmand";
import yelpStores from "./modules/yelpStores";
import googleMealOutStores from "./modules/googleMealOutStores";
import googleMealHomeStores from "./modules/googleMealHomeStores";
import digressions from "./modules/descriptions";
import users from "./modules/users";
import categories from "./modules/categories";
import genres from "./modules/genres";
import stores from "./modules/stores";
import items from "./modules/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rakutenItems,
    rakutenRecipes,
    hotPepperGourmandStores,
    yelpStores,
    googleMealOutStores,
    googleMealHomeStores,
    digressions,
    users,
    categories,
    genres,
    stores,
    items,
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
