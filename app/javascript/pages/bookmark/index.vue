<template>
  <div>
    <p class="text-3xl text-center mt-5">ブックマーク一覧</p>
    <div class="flex mb-3 mt-5 justify-between">
      <div v-for="tabKind in tabKinds" :key="tabKind.tabType">
        <BookmarkTabButton
          :bookmarkType="tabKind.tabType"
          :isActive="isActive"
          @change-tab="changeActive"
        >
          <template #tabKind>{{ tabKind.sentence }}</template>
        </BookmarkTabButton>
      </div>
    </div>
    <transition>
      <StoreBookmarkIndex
        v-if="isActive === 'GoogleStore'"
        :stores="googleStores"
      />
      <HotPepperStoreBookmarkIndex
        v-if="isActive === 'HotpepperStore'"
        :stores="hotpepperStores"
      />
      <StoreBookmarkIndex
        v-if="isActive === 'YelpStore'"
        :stores="yelpStores"
      />
      <ItemBookmarkIndex
        v-if="isActive === 'RakutenFood'"
        :items="rakutenFoods"
      />
      <ItemBookmarkIndex
        v-if="isActive === 'RakutenSweet'"
        :items="rakutenSweets"
      />
      <RecipeBookmarkIndex
        v-if="isActive === 'Recipe'"
        :recipes="savedRecipes"
      />
    </transition>
  </div>
</template>

<script>
import BookmarkTabButton from "../../components/bookmark/BookmarkTabButton.vue";
import StoreBookmarkIndex from "../../components/bookmark/StoreBookmarkIndex.vue";
import HotPepperStoreBookmarkIndex from "../../components/bookmark/HotPepperStoreBookmarkIndex.vue";
import ItemBookmarkIndex from "../../components/bookmark/ItemBookmarkIndex.vue";
import RecipeBookmarkIndex from "../../components/bookmark/RecipeBookmarkIndex";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookmarkIndex",
  components: {
    BookmarkTabButton,
    StoreBookmarkIndex,
    HotPepperStoreBookmarkIndex,
    ItemBookmarkIndex,
    RecipeBookmarkIndex,
  },
  data() {
    return {
      isActive: "GoogleStore",
      tabKinds: [
        { tabType: "GoogleStore", sentence: "Google" },
        { tabType: "HotpepperStore", sentence: "HotPepper" },
        { tabType: "YelpStore", sentence: "Yelp" },
        { tabType: "RakutenFood", sentence: "Food" },
        { tabType: "RakutenSweet", sentence: "Sweet" },
        { tabType: "Recipe", sentence: "Recipe" },
      ],
    };
  },
  computed: {
    ...mapGetters(["savedStores", "savedItems", "savedRecipes"]),
    getActive() {
      return this.isActive;
    },
    googleStores() {
      return this.savedStores.filter(
        (savedStore) => savedStore.store_type === "Google"
      );
    },
    hotpepperStores() {
      return this.savedStores.filter(
        (savedStore) => savedStore.store_type === "HotPepper"
      );
    },
    yelpStores() {
      return this.savedStores.filter(
        (savedStore) => savedStore.store_type === "Yelp"
      );
    },
    rakutenFoods() {
      return this.savedItems.filter(
        (savedItem) => savedItem.item_type === "Food"
      );
    },
    rakutenSweets() {
      return this.savedItems.filter(
        (savedItem) => savedItem.item_type === "Sweet"
      );
    },
  },
  created() {
    this.fetchStores();
    this.fetchItems();
    this.fetchRecipes();
  },
  methods: {
    ...mapActions(["fetchStores", "fetchItems", "fetchRecipes"]),
    changeActive(value) {
      this.isActive = value;
    },
  },
  destroyed() {
    console.log("destroyed!!!!!!!!");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

p {
  font-family: "Yomogi", cursive;
}

.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 2s;
}
.v-enter-to {
  opacity: 1;
}
</style>
