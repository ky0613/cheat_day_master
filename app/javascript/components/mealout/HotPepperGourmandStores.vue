<template>
  <div>
    <Carousel :perPage="3" :paginationPadding="4">
      <Slide v-for="store of stores" :key="store.id" class="px-2 my-3">
        <div
          class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full flex flex-col"
        >
          <a class="bg-blue-300 w-full" :href="store.urls.pc" target="_blank">
            <img
              class="object-cover object-center w-full h-56"
              :src="store.photo.pc.l"
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
          <a
            href="http://webservice.recruit.co.jp/"
            class="h-10 p-3 flex justify-center"
            target="_blank"
            ><p class="text-xs items-center pr-2">Produced by</p>
            <img
              src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
              alt="ホットペッパー Webサービス"
              width="135"
              height="17"
              border="0"
              title="ホットペッパー Webサービス"
              class="items-ceter"
          /></a>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
  props: {
    stores: {
      type: Array,
      required: true,
    },
  },
};
</script>
