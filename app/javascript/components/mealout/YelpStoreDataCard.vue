<template>
  <div>
    <Carousel :perPage="3" :paginationPadding="4">
      <Slide v-for="store of stores" :key="store.id" class="px-2 my-3">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        >
          <a :href="store.url" target="_blank">
            <img
              class="object-cover object-center w-full h-56"
              :src="store.image_url"
              alt="avatar"
            />
          </a>
          <div class="p-2">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200 h-10"
            >
              <img src="../../../../public/shop.svg" class="w-5 h-5" />
              <p class="px-2 text-l font-semibold text-center">
                {{ store.alias }}
              </p>
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
                ({{ store.review_count }})
              </p>
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

export default {
  components: {
    Carousel,
    Slide,
    StarRating,
  },
  props: {
    stores: {
      type: Array,
    },
  },
};
</script>
