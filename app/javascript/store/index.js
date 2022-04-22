import Vue from "vue";
import Vuex from "vuex";

import rakutenItems from "./modules/rakutenItems";
import rakutenRecipes from "./modules/rakutenRecipes";
import hotPepperGourmandStores from "./modules/hotPepperGourmand";
import yelpStores from "./modules/yelpStores";
import googleMealOutStores from "./modules/googleMealOutStores";
import googleMealHomeStores from "./modules/googleMealHomeStores";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    rakutenItems,
    rakutenRecipes,
    hotPepperGourmandStores,
    yelpStores,
    googleMealOutStores,
    googleMealHomeStores,
  },
});
