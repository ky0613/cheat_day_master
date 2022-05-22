<template>
  <div>
    <Carousel
      :perPage="carouselPage"
      :paginationPadding="3"
      paginationPosition="bottom-overlay"
      class="pb-6"
    >
      <Slide
        v-for="(store, index) of stores"
        :key="store.store_id"
        class="md:px-2 md:my-3 md:w-full max-w-1/2 px-1 h-full"
      >
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full h-full border"
        >
          <a
            :href="`https://maps.google.co.jp/maps?q=place_id:${store.store_id}`"
            target="_blank"
          >
            <img
              class="object-cover object-center w-full md:h-56 h-32"
              :src="store.img_url"
              alt="avatar"
            />
          </a>
          <div class="p-2">
            <div
              v-if="wayPoint"
              class="md:text-l text-xs font-semibold text-center"
            >
              {{ index + 1 }}店舗目
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../public/img/shop.svg" class="w-5 h-5" />
              <p class="px-2 md:text-lg text-xs font-semibold text-center">
                {{ store.name }}
              </p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../public/img/place.svg" class="w-5 h-5" />
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
              <StoreBookmark :store="store" />
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import StarRating from "vue-star-rating";
import StoreBookmark from "../components/StoreBookmark.vue";

export default {
  components: {
    Carousel,
    Slide,
    StarRating,
    StoreBookmark,
  },
  props: {
    stores: {
      type: Array,
    },
    wayPoint: {
      type: Boolean,
      default: false,
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
