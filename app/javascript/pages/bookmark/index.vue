<template>
  <div class="min-h-full">
    <p class="md:text-3xl text-sm text-center mt-5">ブックマーク一覧</p>
    <div class="flex mb-3 md:mt-5 mt-2 justify-between">
      <div v-for="tabKind in tabKinds" :key="tabKind.tabType">
        <BookmarkTabButton
          :bookmark-type="tabKind.tabType"
          :is-active="isActive"
          @change-tab="changeActive"
        >
          <template #tabKind>{{ tabKind.sentence }}</template>
        </BookmarkTabButton>
      </div>
    </div>
    <transition name="slide" mode="out-in" class="">
      <StoreBookmarkIndex
        v-if="isActive === 'GoogleStore'"
        key="GoogleStore"
        :stores="googleStores"
        :store-type="'Google'"
      />
      <HotPepperStoreBookmarkIndex
        v-if="isActive === 'HotpepperStore'"
        key="HotpepperStore"
        :stores="hotpepperStores"
      />
      <StoreBookmarkIndex
        v-if="isActive === 'YelpStore'"
        key="YelpStore"
        :stores="yelpStores"
        :store-type="'Yelp'"
      />
      <ItemBookmarkIndex
        v-if="isActive === 'RakutenFood'"
        key="RakutenFood"
        :items="rakutenFoods"
      />
      <ItemBookmarkIndex
        v-if="isActive === 'RakutenSweet'"
        key="RakutenSweet"
        :items="rakutenSweets"
      />
      <RecipeBookmarkIndex
        v-if="isActive === 'Recipe'"
        key="Recipe"
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
    ...mapGetters("bookmark", ["stores", "items", "recipes"]),
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
    ...mapActions([
      "fetchStores",
      "fetchItems",
      "fetchRecipes",
      "deleteStores",
      "deleteItem",
      "deleteRecipe",
    ]),
    changeActive(value) {
      this.deleteBookmarks()
      this.isActive = value;
    },
    deleteBookmarks() {
      if (this.stores.length)
        this.deleteStores(this.stores);
      if (this.items.length)
        this.items.map(async (item) => await this.deleteItem(item.id));
      if (this.recipes.length)
        this.recipes.map(async (recipe) => await this.deleteRecipe(recipe.id));
      this.$store.dispatch("bookmark/resetState");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

p {
  font-family: "Yomogi", cursive;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 0.5s;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
  transition: opacity 0.5s;
}

@keyframes slide-in {
  from {
    transform: translateX(100px);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
