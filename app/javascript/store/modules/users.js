import axios from "../../plugins/axios";

const state = {
  authUser: null,
  oauthToken: null,
};

const getters = {
  authUser: (state) => state.authUser,
  oauthToken: (state) => state.oauthToken,
};

const actions = {
  async loginUser({ commit }, user) {
    const sessionsResponse = await axios.post("sessions", user);
    localStorage.auth_token = sessionsResponse.data.token;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.auth_token}`;
    const userResponse = await axios.get("users/me");
    commit("setUser", userResponse.data);
  },
  logoutUser({ commit }) {
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = "";
    commit("setUser", null);
  },
  async fetchAuthUser({ commit, state }) {
    if (!localStorage.auth_token) return null;
    if (state.authUser) return state.authUser;

    const userResponse = await axios.get("users/me").catch((err) => {
      return null;
    });
    if (!userResponse) return null;

    const authUser = userResponse.data;
    if (authUser) {
      commit("setUser", authUser);
      return authUser;
    } else {
      commit("setUser", null);
      return null;
    }
  },
  async fetchOauthToken({ commit }) {
    const userResponse = await axios.get("oauth/twitter").catch((err) => {
      return null;
    });
    commit("setOauthToken", userResponse.data);
  },
};

const mutations = {
  setUser: (state, user) => {
    state.authUser = user;
  },
  setOauthToken: (state, oauthToken) => {
    state.oauthToken = oauthToken;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
