import axios from "../../plugins/axios";

const convertItemData = (items, item_type) => {
  let rakuteItems = [];
  items.forEach((item) => {
    let convertItem = {
      item_id: item.Item.itemCode,
      img_url: item.Item.mediumImageUrls[0].imageUrl,
      name: item.Item.itemName,
      shop_name: item.Item.shopName,
      price: Number(item.Item.itemPrice),
      rating: Number(item.Item.reviewAverage),
      total_ratings: item.Item.reviewCount,
      item_url: item.Item.itemUrl,
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
    commit("setRakutenItems", convertItemData(response.data.Items, "Food"));
  },
  async fetchRakutenSweets({ commit }, sweetGenre) {
    const response = await axios.get("rakuten_sweets", {
      params: { sweet_genre_id: String(sweetGenre) },
    });
    commit("setRakutenSweets", convertItemData(response.data.Items, "Sweet"));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
