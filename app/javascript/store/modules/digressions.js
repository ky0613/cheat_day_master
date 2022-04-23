import axios from "../../plugins/axios";

const state = {
  digressions: [],
};

const getters = {
  allDigressions: (state) => state.digressions,
};

const actions = {
  fetchDigressions: async ({ commit }) => {
    const response = await axios.get("/digressions");
    commit("setDigressions", response.data);
  },
};

const mutations = {
  setDigressions: (state, digressions) => (state.digressions = digressions),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
