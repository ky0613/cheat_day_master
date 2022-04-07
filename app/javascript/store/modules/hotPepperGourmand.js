import axios from "axios";

const HOTPEPPER_API_ENDPOINT =
  "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

const testConfig = {
  params: {
    key: "104afec0a929daa3",
    lat: "34.67",
    lng: "135.52",
    range: "5",
    order: "4",
    format: "json",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};

const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchStores({ commit }) {
    const response = await axios.get(HOTPEPPER_API_ENDPOINT, testConfig);
    console.log(response);
    commit("setStores", response.data);
  },
};

const mutations = {
  setStores: (state, stores) => {
    console.log(stores);
    parseString(stores, (err, result) => {
      console.error(result);
      state.stores = result.results.shop;
    });
    console.log(state.stores);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
