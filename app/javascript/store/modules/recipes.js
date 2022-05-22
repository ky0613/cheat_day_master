import axios from "../../plugins/axios";

const state = {
  recipes: [],
};

const getters = {
  savedRecipes: (state) => state.recipes,
};

const mutations = {
  setRecipes: (state, recipes) => (state.recipes = recipes),
  newRecipe: (state, recipe) => state.recipes.push(recipe),
  removeRecipe: (state, id) =>
    (state.recipes = state.recipes.filter((recipe) => recipe.id !== id)),
};

const actions = {
  async fetchRecipes({ commit }) {
    const response = await axios.get("recipes");
    commit("setRecipes", response.data);
  },
  async addRecipe({ commit }, item) {
    const response = await axios.post("recipes", item);
    commit("newRecipe", response.data);
  },
  async deleteRecipe({ commit }, id) {
    await axios.delete(`recipes/${id}`);
    commit("removeRecipe", id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
