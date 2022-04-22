import axios from "../../plugins/axios";

const state = {
  items: [],
  sweets: [],
};

const getters = {
  allItems: (state) => state.items,
  allSweets: (state) => state.sweets,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("/rakuten_items");
    commit("setItems", response.data.Items);
  },
  async fetchSweets({ commit }) {
    const response = await axios.get("/rakuten_sweets");
    commit("setSweets", response.data.Items);
  },
};

const mutations = {
  setItems: (state, items) => {
    state.items = [];
    items.forEach((item) => state.items.push(item.Item));
  },
  setSweets: (state, sweets) => {
    state.sweets = [];
    sweets.forEach((sweet) => state.sweets.push(sweet.Item));
  },
  resetState: (state) => {
    state.items = [];
    state.sweets = [];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
