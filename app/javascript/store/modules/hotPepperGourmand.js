import axios from "../../plugins/axios";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const state = {
  hotPepperStores: [],
};

const getters = {
  allStores: (state) => state.hotPepperStores,
};

const actions = {
  async fetchHotPepperStores({ commit }, { lat, lng }) {
    const config = {
      params: {
        lat: String(lat),
        lng: String(lng),
      },
    };
    const response = await axios.get("hot_pepper_stores", config);
    let HotPepperStores = [];
    response.data.results.shop.map((store) => {
      let convertStore = {
        store_id: store.id,
        img_url: store.photo.pc.l,
        name: store.name,
        address: store.address,
        store_url: store.urls.pc,
        store_type: "HotPepper",
      };
      HotPepperStores.push(convertStore);
    });
    commit("setHotPepperStores", HotPepperStores);
  },
};

const mutations = {
  setHotPepperStores: (state, stores) => {
    Object.assign(state.hotPepperStores, shuffle(stores));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
