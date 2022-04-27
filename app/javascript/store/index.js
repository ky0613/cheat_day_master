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
  },
  plugins: [
    createPersistedState({
      key: "cheatDayMaster",
      paths: ["googleMealOutStores", "googleMealHomeStores"],
    }),
  ],
});
