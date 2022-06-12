import axios from "../../plugins/axios";

const convertRecipeData = (recipes) => {
  let rakutenRecipes = [];
  recipes.map((recipe) => {
    let convertRecipe = {
      recipe_id: String(recipe.params.recipeId),
      img_url: recipe.params.foodImageUrl,
      title: recipe.params.recipeTitle,
      cost: recipe.params.recipeCost,
      indication: recipe.params.recipeIndication,
      recipe_url: recipe.params.recipeUrl,
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

const mutations = {
  setRakutenRecipes: (state, recipes) => (state.rakutenRecipes = recipes),
  resetRecipesState: (state) => {
    state.recipes = [];
  },
};

const actions = {
  async fetchRakutenRecipes({ commit }, recipeCategory) {
    try {
      const response = await axios.get("rakuten_recipes", {
        params: { category_id: String(recipeCategory) },
      });
      commit("setRakutenRecipes", convertRecipeData(response.data));
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
