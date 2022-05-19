<template>
  <div class="ml-auto mt-auto mb-2 mr-2">
    <div v-if="authUser">
      <img
        src="../../../public/bookmark_added_black_24dp.svg"
        alt="bookmark"
        v-if="existRecipe(recipe)"
        @click="removeRecipe(recipe)"
        class="ml-auto mr-2 cursor-pointer"
      />
      <img
        src="../../../public/bookmark_add_black_24dp.svg"
        alt="bookmark"
        v-else
        @click="addRecipe(recipe)"
        class="ml-auto mr-2 cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["savedRecipes", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchRecipes();
  },
  methods: {
    ...mapActions(["fetchRecipes", "addRecipe", "deleteRecipe"]),
    existRecipe(recipe) {
      const check = (savedRecipe) => {
        return (
          savedRecipe.recipe_id === recipe.recipe_id &&
          savedRecipe.recipe_type === recipe.recipe_type
        );
      };
      return this.savedRecipes.some(check);
    },
    removeRecipe(recipe) {
      const removeRecipe = this.savedRecipes.find(
        (savedRecipe) =>
          savedRecipe.recipe_id === recipe.recipe_id &&
          savedRecipe.recipe_type === recipe.recipe_type
      );
      this.deleteRecipe(removeRecipe.id);
    },
  },
};
</script>
