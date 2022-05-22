<template>
  <div class="md:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 mx-1">
    <div
      v-for="recipe of recipes"
      :key="recipe.recipe_id"
      class="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full border"
    >
      <img
        class="object-cover object-center w-full md:h-56 h-32"
        :src="recipe.img_url"
        alt="avatar"
      />
      <div class="w-full md:h-12 h-8">
        <a
          class="py-2 text-gray-700 dark:text-gray-400 md:text-sm hover:text-blue-400 hover:underline text-xs"
          :href="recipe.recipe_url"
          target="_blank"
        >
          {{ recipe.title }}
        </a>
      </div>
      <hr />
      <div class="flex">
        <div class="p-2 flex flex-col">
          <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <img src="../../../../public/img/money.svg" class="w-5 h-5" />
            <p class="px-2 text-sm">{{ recipe.cost }}</p>
          </div>
          <div class="flex items-left mt-4 text-gray-700 dark:text-gray-200">
            <img src="../../../../public/img/time.svg" class="w-5 h-5" />
            <p class="px-2 text-sm">{{ recipe.indication }}</p>
          </div>
        </div>
        <RecipeBookmark :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipeBookmark from "../RecipeBookmark.vue";

export default {
  components: {
    RecipeBookmark,
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>
