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
  removeRecipe: (state, recipe_ids) =>
    { state.recipes = state.recipes.filter((recipe) => !recipe_ids.includes(recipe.id, 0))},
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
  async deleteRecipes({ commit }, recipes) {
    const recipe_ids = recipes.map(recipe => recipe.id)
    await axios.delete("recipes", { params: { recipe_ids: recipe_ids } });
    commit("removeRecipe", recipe_ids);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
