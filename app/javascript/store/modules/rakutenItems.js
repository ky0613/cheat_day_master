import axios from "../../plugins/axios";



const state = {
  items: [],
};

const getters = {
  allItems: (state) => state.items,
};

const actions = {
  async fetchItems({ commit }) {
    const response = await axios.get("/rakuten_items");
    console.log(response.data)
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
