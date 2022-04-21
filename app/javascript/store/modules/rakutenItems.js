import axios from "../../plugins/axios";

const state = {
  items: [],
};

const getters = {
  allItems: (state) => state.items,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("/rakuten_items");
    commit("setItems", response.data.Items);
  },
};

const mutations = {
  setItems: (state, items) => {
    state.items = [];
    items.forEach((item) => state.items.push(item.Item));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
