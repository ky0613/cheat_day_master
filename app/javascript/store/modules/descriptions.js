import axios from "../../plugins/axios";

const state = {
  descriptions: [],
};

const getters = {
  allDescriptions: (state) => state.descriptions,
};

const actions = {
  fetchDescriptions: async ({ commit }) => {
    const response = await axios.get("/digressions");
    let descriptions = [];
    response.data.forEach((item) => {
      descriptions.push(item.description);
    });
    commit("setDescriptions", descriptions);
  },
};

const mutations = {
  setDescriptions: (state, descriptions) => (state.descriptions = descriptions),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
