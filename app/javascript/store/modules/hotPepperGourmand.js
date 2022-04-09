import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";

const HOTPEPPER_API_ENDPOINT =
  "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

const config = {
  params: {
    key: "104afec0a929daa3",
    lat: "34.67",
    lng: "135.52",
    range: "5",
    order: "4",
    format: "jsonp",
  },
  adapter: axiosJsonpAdapter,
};

const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchStores({ commit }) {
    const response = await axios.get(HOTPEPPER_API_ENDPOINT, config);
    commit("setStores", response.data.results.shop);
  },
};

const mutations = {
  setStores: (state, stores) => {
    for (let i = 0; i < 4; i++) {
      state.stores.push(stores[i]);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
