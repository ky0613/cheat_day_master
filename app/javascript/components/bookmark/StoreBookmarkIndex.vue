<template>
  <div class="flex mt-5">
    <div class="w-full grid grid-cols-3 gap-4" v-if="stores.length !== 0">
      <div v-for="store in stores" :key="store.id">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        >
          <a :href="storeUrl(store)" target="_blank">
            <img
              class="object-cover object-center w-full h-56"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-2">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../../public/shop.svg" class="w-5 h-5" />
              <p class="px-2 text-l font-semibold text-center">
                {{ store.name }}
              </p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../../public/place.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ store.address }}</p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
            >
              <StarRating
                :increment="0.1"
                :round-start-rating="false"
                :read-only="true"
                :rating="store.rating"
                :star-size="25"
                class="items-center text-base"
              ></StarRating>
              <p class="px-2 text-base items-center jus">
                ({{ store.total_ratings }})
              </p>
              <StoreBookmark :store="store" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-24 mx-auto">
      <p class="text-center text-6xl yomogi">
        まだお気に入りが <br />
        登録されていません。
      </p>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import StoreBookmark from "../../components/StoreBookmark.vue";

export default {
  components: {
    StarRating,
    StoreBookmark,
  },
  props: {
    stores: {
      type: Array,
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
