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
  async fetchItems({ commit }, foodGenre) {
    const response = await axios.get("rakuten_items", {
      params: { food_genre_id: String(foodGenre) },
    });
    commit("setItems", response.data.Items);
  },
  async fetchSweets({ commit }, sweetGenre) {
    const response = await axios.get("rakuten_sweets", {
      params: { sweet_genre_id: String(sweetGenre) },
    });
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
  resetRakutenState: (state) => {
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
