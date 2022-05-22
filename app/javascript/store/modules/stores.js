import axios from "../../plugins/axios";

const state = {
  stores: [],
};

const getters = {
  savedStores: (state) => state.stores,
};

const mutations = {
  setStores: (state, stores) => (state.stores = stores),
  newStore: (state, store) => state.stores.push(store),
  removeStore: (state, id) =>
    (state.stores = state.stores.filter((store) => store.id !== id)),
};

const actions = {
  async fetchStores({ commit }) {
    const response = await axios.get("stores");
    commit("setStores", response.data);
  },
  async addStore({ commit }, store) {
    const response = await axios.post("stores", store);
    commit("newStore", response.data);
  },
  async deleteStore({ commit }, id) {
    await axios.delete(`stores/${id}`);
    commit("removeStore", id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
