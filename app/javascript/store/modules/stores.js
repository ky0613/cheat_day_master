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
  removeStore: (state, store_ids) => {
    state.stores = state.stores.filter((store) => !store_ids.includes(store.id, 0))
  }
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
  async deleteStores({ commit }, stores) {
    const store_ids = stores.map((store) => store.id)
    await axios.delete("stores", { params: {store_ids: store_ids} });
    commit("removeStore", store_ids);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
