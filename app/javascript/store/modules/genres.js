import axios from "../../plugins/axios";

const state = {
  foodGenres: [],
  sweetGenres: [],
};

const getters = {
  foodGenres: (state) => state.foodGenres,
  sweetGenres: (state) => state.sweetGenres,
};

const actions = {
  fetchGenres: async ({ commit }) => {
    const response = await axios.get("genres");
    commit(
      "setFoodGenres",
      response.data.filter((foodGenre) => foodGenre.genre_type === "food")
    );
    commit(
      "setSweetGenres",
      response.data.filter((sweetGenre) => sweetGenre.genre_type === "sweet")
    );
  },
};

const mutations = {
  setFoodGenres: (state, foodGenres) => (state.foodGenres = foodGenres),
  setSweetGenres: (state, sweetGenres) => (state.sweetGenres = sweetGenres),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
