import axios from "../../plugins/axios";

const state = {
  recipes: [],
};

const getters = {
  allRecipes: (state) => state.recipes,
};

const actions = {
  async fetchRecipes({ commit }, recipeCategory) {
    const response = await axios.get("/rakuten_recipes", {
      params: { category_id: String(recipeCategory) },
    });
    commit("setRecipes", response.data.result);
  },
};

const mutations = {
  setRecipes: (state, recipes) => (state.recipes = recipes),
  resetState: (state) => {
    state.recipes = [];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
