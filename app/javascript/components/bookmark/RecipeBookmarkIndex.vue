<template>
  <div class="flex flex-col mt-5">
    <div
      v-if="recipes.length !== 0"
      class="w-full grid md:grid-cols-3 grid-cols-2 gap-4"
    >
      <div
        v-for="recipe of recipes"
        :key="recipe.recipe_id"
        class="mx-2 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full border"
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
          <hr />
        </div>
        <div class="flex my-auto">
          <div class="p-2 flex flex-col">
            <div
              class="flex items-center mt-4 text-gray-700 dark:text-gray-200"
            >
              <img src="../../../../public/img/money.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ recipe.cost }}</p>
            </div>
            <div class="flex items-left mt-4 text-gray-700 dark:text-gray-200">
              <img src="../../../../public/img/time.svg" class="w-5 h-5" />
              <p class="px-2 text-sm">{{ recipe.indication }}</p>
            </div>
          </div>
          <RecipeBookmarkButton :recipe="recipe" class="ml-auto" />
        </div>
      </div>
    </div>
    <div v-else class="mt-24 mx-auto">
      <p class="text-center md:text-6xl text-4xl yomogi">
        まだお気に入りが <br />
        登録されていません。
      </p>
    </div>
  </div>
</template>

<script>
import RecipeBookmarkButton from "./RecipeBookmarkButton.vue";

export default {
  components: {
    RecipeBookmarkButton,
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
