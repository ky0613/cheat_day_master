<template>
  <div class="border-solid">
    <Carousel
      :per-page="carouselPage"
      :pagination-padding="3"
      pagination-position="bottom-overlay"
      class="pb-6"
    >
      <Slide
        v-for="item of items"
        :key="item.item_id"
        class="md:px-2 md:my-3 md:w-full max-w-1/2 px-1 h-full"
      >
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full h-full border"
        >
          <div class="w-full">
            <a
              class="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 hover:text-blue-400 hover:underline"
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
              <div class="flex items-center">
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
              :round-start-rating="false"
              :read-only="true"
              :rating="Number(item.rating)"
              :star-size="starSize"
              text-class="md:text-base text-xs mt-1"
            />
            <p class="md:text-base text-xs mt-1">({{ item.total_ratings }})</p>
            <ItemBookmark :item="item" />
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import StarRating from "vue-star-rating";
import ItemBookmark from "../ItemBookmark.vue";

export default {
  components: {
    Carousel,
    Slide,
    StarRating,
    ItemBookmark,
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
