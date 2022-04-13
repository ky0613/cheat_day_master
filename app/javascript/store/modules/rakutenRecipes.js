import axios from "axios";

const RAKUTEN_RECIPE_API_END_POINT =
  "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?";

const config = {
  params: {
    format: "json",
    applicationId: "1093853470195032291",
    categoryId: "30",
  },
};

const state = {
  recipes: [],
};

const getters = {
  allRecipes: (state) => state.recipes,
};

const actions = {
  async fetchRecipes({ commit }) {
    const response = await axios.get(RAKUTEN_RECIPE_API_END_POINT, config);
    commit("setRecipes", response.data.result);
  },
};

const mutations = {
  setRecipes: (state, recipes) => (state.recipes = recipes),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
