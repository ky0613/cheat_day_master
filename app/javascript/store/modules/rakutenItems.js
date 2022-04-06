import axios from "axios";

let apiKeyHotPeppaer = process.env.HOT_PEPPER_API_KEY;

const state = {
  items: [],
};

const getters = {
  allItems: (state) => state.items,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get(
      "https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&genreId=100227&applicationId=1093853470195032291"
    );
    commit("setItems", response.data);
  },
};

const mutations = {
  setItems: (state, items) => {
    state.items = [];
    for (let i = 0; i < 4; i++) {
      state.items.push(items.Items[i].Item);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
