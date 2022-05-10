<template>
  <div>
    <Carousel :perPage="3" :paginationPadding="4" class="p-1">
      <Slide v-for="item of items" :key="item.item_id" class="px-2 my-3">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
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
          <div class="p-2 flex">
            <img class="mx-1" :src="item.img_url" />
            <div
              class="flex flex-col mt-4 text-gray-700 dark:text-gray-200 justify-right"
            >
              <div class="flex mb-3">
                <img src="../../../../public/money.svg" class="w-5 h-5" />
                <p class="px-2 text-base font-semibold">{{ item.price }}円</p>
              </div>
              <div class="flex">
                <img src="../../../../public/shop.svg" class="w-5 h-5" />
                <p class="px-2 text-sm">{{ item.shop_name }}</p>
              </div>
            </div>
          </div>
          <div
            class="flex items-center mt-4 text-gray-700 dark:text-gray-200 pb-4"
          >
            <StarRating
              :increment="0.01"
              :read-only="true"
              :rating="Number(item.rating)"
              :star-size="30"
              class="items-center text-base"
            />
            <p class="px-2 text-base items-center">
              ({{ item.total_ratings }})
            </p>
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
};
</script>
