import axios from "axios";

axios.interceptors.request.use((request) => {
  console.log("Starting Request: ", request);
  return request;
});

const KEY = process.env.HOT_PEPPER_API_KEY;

let parseString = require("xml2js").parseString;

const HOTPEPPER_API_ENDPOINT = "hotpepper/gourmet/v1/";
let config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};
let params = {
  key: "104afec0a929daa3",
  format: "json",
  lat: "34.67",
  lng: "135.52",
  range: "4",
  order: "4",
};

const testConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  params: {
    key: "104afec0a929daa3",
    lat: "34.67",
    lng: "135.52",
    range: "5",
    order: "4",
    format: "jsonp",
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
    const response = await axios.get("/api/", testConfig);
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
