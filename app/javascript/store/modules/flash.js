const state = () => ({
  flash: {
    // "success" or "error"
    type: "",
    message: "",
  },
});

const getters = {
  flash: (state) => state.flash,
  isFlash: (state) => !!state.flash.message,
};

const actions = {
  setFlash({ commit }, { type, message }) {
    commit("setFlash", { type, message });
  },
};

const mutations = {
  setFlash(state, { type, message }) {
    state.flash.type = type;
    state.flash.message = message;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
