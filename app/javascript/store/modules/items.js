import axios from "../../plugins/axios";

const state = {
  items: [],
};

const getters = {
  savedItems: (state) => state.items,
};

const mutations = {
  setItem: (state, items) => (state.items = items),
  newItem: (state, item) => state.items.push(item),
  removeItem: (state, item_ids) =>{
    state.items = state.items.filter((item) => !item_ids.includes(item.id, 0))
  }
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
  async deleteItems({ commit }, items) {
    const item_ids = items.map((item) => item.id)
    await axios.delete("items", { params: {item_ids: item_ids} });
    commit("removeItem", item_ids);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
