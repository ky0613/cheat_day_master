<template>
  <div>
    <Carousel :perPage="3" :paginationPadding="4" class="p-1">
      <Slide v-for="item of items" :key="item.itemCode" class="px-2 mb-3">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        >
          <div class="bg-blue-300 w-full">
            <a
              class="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 hover:text-white hover:underline"
              :href="item.itemUrl"
              target="_blank"
            >
              {{ item.itemName }}
            </a>
          </div>
          <div class="p-2 flex">
            <img class="mx-1" :src="item.mediumImageUrls[0].imageUrl" />
            <div
              class="flex flex-col mt-4 text-gray-700 dark:text-gray-200 justify-right"
            >
              <div class="flex">
                <img src="../../../../public/money.svg" class="w-5 h-5" />
                <p class="px-2 text-base font-semibold">
                  {{ item.itemPrice }}円
                </p>
              </div>
              <div class="flex">
                <img src="../../../../public/shop.svg" class="w-5 h-5" />
                <p class="px-2 text-sm">{{ item.shopName }}</p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center mt-4 text-gray-700 dark:text-gray-200 pb-4"
          >
            <StarRating
              :increment="0.01"
              :read-only="true"
              :rating="Number(item.reviewAverage)"
              :star-size="30"
              class="items-center text-base"
            ></StarRating>
            <p class="px-2 text-base items-center">({{ item.reviewCount }})</p>
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
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
