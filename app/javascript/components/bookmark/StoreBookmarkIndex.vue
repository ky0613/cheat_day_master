<template>
  <div class="flex mt-5">
    <div
      v-if="stores.length !== 0"
      class="w-full grid md:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-for="store in stores" :key="store.id">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full border h-full"
        >
          <a :href="storeUrl(store)" target="_blank">
            <img
              v-if="storeType !== 'Google'"
              class="object-cover object-center w-full md:h-56 h-32"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-2">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../../public/img/shop.svg" class="w-5 h-5" />
              <a :href="storeUrl(store)" target="_blank">
              <p class="px-2 md:text-lg text-xs font-semibold text-center hover:text-blue-400">
                {{ store.name }}
              </p>
              </a>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../../public/img/place.svg" class="w-5 h-5" />
              <p class="px-2 md:text-sm text-xs">{{ store.address }}</p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
            >
              <StarRating
                :increment="0.01"
                :round-start-rating="false"
                :read-only="true"
                :rating="store.rating"
                :star-size="starSize"
                text-class="md:text-base text-xs mt-1"
              />
              <p class="md:text-base text-xs mt-1">
                ({{ store.total_ratings }})
              </p>
              <BookmarkButton :store="store" />
            </div>
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
import BookmarkButton from "./StoreBookmarkButton.vue";

export default {
  components: {
    StarRating,
    BookmarkButton,
  },
  props: {
    stores: {
      type: Array,
      required: true,
    },
    storeType: {
      type: String,
      required: true
    }
  },
  computed: {
    starSize() {
      return window.innerWidth >= 768 ? 20 : 15;
    },
  },
  methods: {
    storeUrl(store) {
      if (store.store_url) {
        return store.store_url;
      }
      return `https://maps.google.co.jp/maps?q=place_id:${store.store_id}`;
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
