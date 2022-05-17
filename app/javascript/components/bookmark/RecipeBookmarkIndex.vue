<template>
  <div class="flex flex-col mt-5">
    <div class="w-full grid grid-cols-3 gap-4" v-if="recipes.length !== 0">
      <div
        class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full"
        v-for="recipe of recipes"
        :key="recipe.recipe_id"
      >
        <img
          class="object-cover object-center w-full h-56"
          :src="recipe.img_url"
          alt="avatar"
        />
        <div class="w-full">
          <a
            class="py-2 text-gray-700 dark:text-gray-400 text-sm hover:text-blue-400 hover:underline"
            :href="recipe.recipe_url"
            target="_blank"
          >
            {{ recipe.title }}
          </a>
          <hr />
        </div>
        <div class="flex my-auto">
          <div class="p-2 flex">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
            >
              <img src="../../../../public/money.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ recipe.cost }}</p>
            </div>
            <div class="flex items-left mt-4 text-gray-700 dark:text-gray-200">
              <img src="../../../../public/time.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ recipe.indication }}</p>
            </div>
          </div>
          <RecipeBookmark :recipe="recipe" class="ml-auto" />
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

.yomogi {
  font-family: "Yomogi", cursive;
}
</style>
