<template>
  <div class="mt-5">
    <div class="w-full grid grid-cols-3 gap-4" v-if="items.length !== 0">
      <div v-for="item in items" :key="item.id">
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
import StarRating from "vue-star-rating";
import ItemBookmark from "../../components/ItemBookmark.vue";

export default {
  components: {
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

.yomogi {
  font-family: "Yomogi", cursive;
}
</style>
