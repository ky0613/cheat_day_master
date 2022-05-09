import axios from "../../plugins/axios";

const state = {
  yelpStores: [],
};

const getters = {
  allYelpStores: (state) => state.yelpStores,
};

const actions = {
  async fetchYelpStores({ commit }, { lat, lng }) {
    const config = {
      params: {
        lat: String(lat),
        lng: String(lng),
      },
    };
    const response = await axios.get("yelp_stores", config);
    let YelpStores = [];
    response.data.businesses.map((store) => {
      let convertStore = {
        store_id: store.id,
        img_url: store.image_url,
        name: store.alias,
        address: Object.values(store.location).splice(0, 3).join(" "),
        rating: store.rating,
        total_ratings: store.review_count,
        store_url: store.url,
        store_type: "Yelp",
      };
      YelpStores.push(convertStore);
    });
    commit("setYelpStores", YelpStores);
  },
};

const mutations = {
  setYelpStores: (state, stores) => {
    state.yelpStores = stores;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
