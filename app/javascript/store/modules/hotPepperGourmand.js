import axios from "axios";

const KEY = process.env.HOT_PEPPER_API_KEY;
let parseString = require("xml2js").parseString;
let config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};
const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchStores({ commit }) {
    const response = await axios.get(
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=104afec0a929daa3&lat=34.67&lng=135.52&range=5&order=4&format=json",
      config
    );
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
