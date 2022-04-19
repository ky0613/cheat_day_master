<template>
  <div class="p-6 flex justify-between">
    <div
      class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
      v-for="store of stores"
      :key="store.id"
    >
      <a :href="store.url">
        <img
          class="object-cover object-center w-full h-56"
          :src="store.image_url"
          alt="avatar"
        />
      </a>
      <div class="px-6 py-4">
        <p
          class="text-xl font-semibold text-gray-800 dark:text-white text-center"
        >
          {{ store.alias }}
        </p>
        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <p class="px-2 text-sm">レビュー: {{ store.rating }}</p>
          <p class="px-2 text-sm">レビュー総数: {{ store.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stores: {
      type: Array,
    },
  },
};
</script>
