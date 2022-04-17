import axios from "axios";

const YELP_API_ENDPOINT =
  "https://api.yelp.com/v3/businesses/search";

const state = {
  stores: [],
};

const getters = {
  allStores: (state) => state.stores,
};

const actions = {
  async fetchYelpStores({ commit }) {
    const response = await axios
      .get(YELP_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          latitude: 35.6581,
          longitude: 139.7017,
          radius: "3000",
        },
      })

    console.log(response)
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
