<template>
  <div class="p-6 flex justify-between">
    <div
      class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
      v-for="store of stores"
      :key="store.place_id"
    >
      <img
        class="object-cover object-center w-full h-56"
        :src="store.storePhoto"
        alt="avatar"
      />
      <div class="px-6 py-4">
        <p
          class="text-xl font-semibold text-gray-800 dark:text-white text-center"
        >
          {{ store.name }}
        </p>
        <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
          <p class="px-2 text-sm">{{ store.vicinity }}</p>
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
