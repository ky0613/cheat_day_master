import axios from "../../plugins/axios";

const convertRecipeData = (recipes) => {
  let rakutenRecipes = [];
  recipes.forEach((recipe) => {
    let convertRecipe = {
      recipe_id: String(recipe.recipeId),
      img_url: recipe.foodImageUrl,
      title: recipe.recipeTitle,
      cost: recipe.recipeCost,
      indication: recipe.recipeIndication,
      recipe_url: recipe.recipeUrl,
    };
    rakutenRecipes.push(convertRecipe);
  });
  return rakutenRecipes;
};

const state = {
  rakutenRecipes: [],
};

const getters = {
  allRecipes: (state) => state.rakutenRecipes,
};

const actions = {
  async fetchRakutenRecipes({ commit }, recipeCategory) {
    const response = await axios.get("/rakuten_recipes", {
      params: { category_id: String(recipeCategory) },
    });
    commit("setRakutenRecipes", convertRecipeData(response.data.result));
  },
};

const mutations = {
  setRakutenRecipes: (state, recipes) => (state.rakutenRecipes = recipes),
  resetRecipesState: (state) => {
    state.recipes = [];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
