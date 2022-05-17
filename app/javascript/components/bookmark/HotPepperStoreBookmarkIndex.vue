<template>
  <div class="flex flex-col mt-5">
    <div class="w-full grid grid-cols-3 gap-4" v-if="stores">
      <div v-for="store in stores" :key="store.id">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full flex flex-col"
        >
          <a class="bg-blue-300 w-full" :href="store.store_url" target="_blank">
            <img
              class="object-cover object-center w-full h-56"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-1">
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
          </div>
          <div class="flex">
            <a
              href="http://webservice.recruit.co.jp/"
              class="h-10 p-3 w-full"
              target="_blank"
            >
              <img
                src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
                alt="ホットペッパー Webサービス"
                width="135"
                height="17"
                border="0"
                title="ホットペッパー Webサービス"
            /></a>
            <StoreBookmark :store="store" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-48">
      <p class="text-center text-6xl yomogi">
        まだお気に入りが <br />
        登録されていません。
      </p>
    </div>
  </div>
</template>

<script>
import StoreBookmark from "../../components/StoreBookmark.vue";

export default {
  components: {
    StoreBookmark,
  },
  props: {
    stores: {
      type: Array,
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
