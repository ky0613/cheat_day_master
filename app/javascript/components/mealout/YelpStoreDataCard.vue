<template>
  <div>
    <Carousel :perPage="3" :paginationPadding="4">
      <Slide v-for="store of stores" :key="store.store_id" class="px-2 my-3">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full border"
        >
          <a :href="store.store_url" target="_blank">
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
              <img src="../../../../public/img/shop.svg" class="w-5 h-5" />
              <p class="px-2 text-l font-semibold text-center">
                {{ store.name }}
              </p>
            </div>
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-6"
            >
              <img src="../../../../public/img/place.svg" class="w-5 h-5" />
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
                :star-size="30"
                class="items-center text-base"
              />
              <p class="px-2 text-base items-center">
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
import StoreBookmark from "../../components/StoreBookmark.vue";

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
  },
};
</script>
