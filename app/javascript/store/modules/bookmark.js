const state = {
  stores: [],
  items: [],
  recipes: [],
};

const getters = {
  stores: (state) => state.stores,
  items: (state) => state.items,
  recipes: (state) => state.recipes,
};

const actions = {
  setStores({ commit }, getStore) {
    commit("setStores", getStore);
  },
  deleteStores({ commit }, getStore) {
    commit("deleteStores", getStore);
  },
  setItems({ commit }, getItem) {
    commit("setItems", getItem);
  },
  deleteItems({ commit }, getItem) {
    commit("deleteItem", getItem);
  },
  setRecipes({ commit }, getRecipe) {
    commit("setRecipes", getRecipe);
  },
  deleteRecipes({ commit }, getRecipe) {
    commit("deleteRecipe", getRecipe);
  },
  resetState({ commit }) {
    commit("resetState");
  },
};

const mutations = {
  setStores(state, getStore) {
    state.stores.push(getStore);
  },
  deleteStores(state, getStore) {
    state.stores = state.stores.filter(
      (store) => store.store_id !== getStore.store_id
    );
  },
  setItems(state, getItem) {
    state.items.push(getItem);
  },
  deleteItems(state, getItem) {
    state.items = state.items.delete(
      (item) => item.item_id !== getItem.item_id
    );
  },
  setRecipes(state, getRecipe) {
    state.recipes.push(getRecipe);
  },
  deleteRecipes(state, getRecipe) {
    state.recipes = state.recipes.delete(
      (recipe) => recipe.recipe_id !== getRecipe.recipe_id
    );
  },
  resetState(state) {
    state.stores = [];
    state.items = [];
    state.recipes = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
