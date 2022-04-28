import axios from "../../plugins/axios";

const state = {
  categories: [],
};

const getters = {
  categories: (state) => state.categories,
};

const actions = {
  fetchCategories: async ({ commit }) => {
    const response = await axios.get("categories");
    commit("setCategories", response.data);
  },
};

const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
