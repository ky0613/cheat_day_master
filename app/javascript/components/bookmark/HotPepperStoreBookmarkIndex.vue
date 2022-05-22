<template>
  <div class="flex flex-col mt-5">
    <div
      v-if="storesData.length !== 0"
      class="w-full grid md:grid-cols-3 grid-cols-2 gap-4"
    >
      <div v-for="store in storesData" :key="store.id">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full flex flex-col border h-full"
        >
          <a class="bg-blue-300 w-full" :href="store.store_url" target="_blank">
            <img
              class="object-cover object-center w-full md:h-56 h-32"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-1">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../../public/img/shop.svg" class="w-5 h-5" />
              <p class="px-2 md:text-lg text-xs font-semibold text-center">
                {{ store.name }}
              </p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../../public/img/place.svg" class="w-5 h-5" />
              <p class="px-2 md:text-sm text-xs">{{ store.address }}</p>
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
    <div v-else class="mt-24 mx-auto">
      <p class="text-center md:text-6xl text-4xl yomogi">
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
      required: true,
    },
  },
  data() {
    return {
      // カードの表示を保持するためにdata内で展開する
      storesData: [...this.stores],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

.yomogi {
  font-family: "Yomogi", cursive;
}
</style>
