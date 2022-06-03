<template>
  <div class="mt-5">
    <div
      v-if="items.length !== 0"
      class="w-full grid md:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-for="item in items" :key="item.id">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full h-full border"
        >
          <div class="w-full">
            <a
              class="md:text-sm text-xs text-gray-700 dark:text-gray-400 line-clamp-3 hover:text-blue-400 hover:underline"
              :href="item.item_url"
              target="_blank"
            >
              {{ item.name }}
            </a>
            <hr />
          </div>
          <div class="p-2 flex md:flex-row flex-col">
            <img class="mx-1" :src="item.img_url" />
            <div
              class="flex flex-col mt-4 text-gray-700 dark:text-gray-200 justify-right"
            >
              <div class="flex md:mb-3 mb-1 items-center">
                <img src="../../../../public/img/money.svg" class="w-5 h-5" />
                <p class="px-2 md:text-base text-sm font-semibold">
                  {{ item.price }}円
                </p>
              </div>
              <div class="flex">
                <img src="../../../../public/img/shop.svg" class="w-5 h-5" />
                <p class="px-2 md:text-sm text-xs">{{ item.shop_name }}</p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center md:mt-4 my-2 ml-2 text-gray-700 dark:text-gray-200 md:pb-4 pb-1"
          >
            <StarRating
              :increment="0.01"
              :read-only="true"
              :rating="Number(item.rating)"
              :star-size="starSize"
              text-class="md:text-base text-xs mt-1"
            />
            <p class="md:text-base text-xs mt-1">({{ item.total_ratings }})</p>
            <ItemBookmarkButton :item="item" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-24 mx-auto">
      <p class="text-center md:text-6xl text-4xl yomogi">
        まだお気に入りが <br />
        登録されていません。
      </p>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import ItemBookmarkButton from "./ItemBookmarkButton.vue";

export default {
  components: {
    StarRating,
    ItemBookmarkButton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    carouselPage() {
      return window.innerWidth >= 768 ? 3 : 2;
    },
    starSize() {
      return window.innerWidth >= 768 ? 20 : 15;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

.yomogi {
  font-family: "Yomogi", cursive;
}
</style>
