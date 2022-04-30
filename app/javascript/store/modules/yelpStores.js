import axios from "../../plugins/axios";

const state = {
  stores: [],
};

const getters = {
  allYelpStores: (state) => state.stores,
};

const actions = {
  async fetchYelpStores({ commit }, { lat, lng }) {
    const config = {
      params: {
        lat: String(lat),
        lng: String(lng),
      },
    };
    const response = await axios.get("yelp_stores", config);
    commit("setYelpStores", response.data.businesses);
  },
};

const mutations = {
  setYelpStores: (state, stores) => {
    state.stores = stores;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
