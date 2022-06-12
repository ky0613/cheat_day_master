import axios from "../../plugins/axios";

const convertItemData = (items, item_type) => {
  let rakuteItems = [];
  items.map((item) => {
    let convertItem = {
      item_id: item.params.itemCode,
      img_url: item.params.mediumImageUrls[0],
      name: item.params.itemName,
      shop_name: item.params.shopName,
      price: Number(item.params.itemPrice),
      rating: Number(item.params.reviewAverage),
      total_ratings: item.params.reviewCount,
      item_url: item.params.itemUrl,
      item_type: item_type,
    };
    rakuteItems.push(convertItem);
  });
  return rakuteItems;
};

const state = {
  rakutenItems: [],
  rakutenSweets: [],
};

const getters = {
  allItems: (state) => state.rakutenItems,
  allSweets: (state) => state.rakutenSweets,
};

const mutations = {
  setRakutenItems: (state, items) => {
    state.rakutenItems = items;
  },
  setRakutenSweets: (state, sweets) => {
    state.rakutenSweets = sweets;
  },
  resetRakutenState: (state) => {
    state.rakutenItems = [];
    state.rakutenSweets = [];
  },
};

const actions = {
  async fetchRakutenItems({ commit }, foodGenre) {
    const response = await axios.get("rakuten_items", {
      params: { food_genre_id: String(foodGenre) },
    });
    commit("setRakutenItems", convertItemData(response.data, "Food"));
  },
  async fetchRakutenSweets({ commit }, sweetGenre) {
    const response = await axios.get("rakuten_sweets", {
      params: { sweet_genre_id: String(sweetGenre) },
    });
    commit("setRakutenSweets", convertItemData(response.data, "Sweet"));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
