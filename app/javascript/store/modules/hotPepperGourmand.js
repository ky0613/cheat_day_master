import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";
import store from "..";

const HOTPEPPER_API_ENDPOINT =
  "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchStores({ commit }, { lat, lng }) {
    const config = {
      params: {
        key: process.env.HOT_PEPPER_API_KEY,
        lat: String(lat),
        lng: String(lng),
        range: "5",
        order: "4",
        format: "jsonp",
      },
      adapter: axiosJsonpAdapter,
    };
    const response = await axios.get(HOTPEPPER_API_ENDPOINT, config);
    commit("setStores", response.data.results.shop);
  },
};

const mutations = {
  setStores: (state, stores) => {
    let shuffleStores = shuffle(stores).splice(0, 4);
    shuffleStores.forEach((store) => state.stores.push(store));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
