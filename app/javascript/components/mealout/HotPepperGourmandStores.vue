<template>
  <div>
    <Carousel
      :perPage="carouselPage"
      :paginationPadding="3"
      paginationPosition="bottom-overlay"
      class="pb-6"
    >
      <Slide
        v-for="store of stores"
        :key="store.store_id"
        class="md:px-2 md:my-3 md:w-full max-w-1/2 px-1 h-full"
      >
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
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import StoreBookmark from "../../components/StoreBookmark.vue";

export default {
  components: {
    Carousel,
    Slide,
    StoreBookmark,
  },
  props: {
    stores: {
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
