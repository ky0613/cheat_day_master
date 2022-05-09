import axios from "../../plugins/axios";

const state = {
  items: [],
};

const getters = {
  savedItems: (state) => state.items,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("items");
    commit("setItem", response.data);
  },
  async addItem({ commit }, item) {
    const response = await axios.post("items", item);
    commit("newItem", response.data);
  },
  async deleteItem({ commit }, id) {
    await axios.delete(`items/${id}`);
    commit("removeItem", id);
  },
};

const mutations = {
  setItem: (state, items) => (state.items = items),
  newItem: (state, item) => state.items.push(item),
  removeItem: (state, id) =>
    (state.items = state.items.filter((item) => item.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
