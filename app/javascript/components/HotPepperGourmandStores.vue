<template>
  <div class="p-6 flex justify-between">
    <div
      class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
      v-for="item of items"
      :key="item.itemCode"
    >
      <div class="bg-blue-300 w-full">
        <a
          class="py-2 text-gray-700 dark:text-gray-400 text-sm hover:text-white hover:underline"
          :href="item.itemUrl"
        >
          {{ item.itemName }}
        </a>
      </div>
      <div class="px-6 py-4">
        <img class="mx-auto" :src="item.mediumImageUrls[0].imageUrl" />
        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <p class="px-2 text-sm">価格: {{ item.itemPrice }} 円</p>
        </div>
        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <p class="px-2 text-sm">評価: {{ item.reviewAverage }}</p>
        </div>
        <div
          class="flex flex-col items-left mt-4 text-gray-700 dark:text-gray-200"
        >
          <p class="px-2 text-sm">店名:</p>
          <p class="px-2 text-sm">{{ item.shopName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  image-rendering: -webkit-optimize-contrast;
}
</style>
