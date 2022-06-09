<template>
  <div class="ml-auto mt-auto mb-2 mr-2">
    <div v-if="authUser">
      <img
        v-if="isActive"
        src="../../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        class="ml-auto mr-2 cursor-pointer"
        @click="pushDeleteRecipe(recipe)"
      />
      <img
        v-else
        src="../../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        class="ml-auto mr-2 cursor-pointer"
        @click="pushAddRecipe"
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
  data() {
    return {
      isActive: true,
      unbookmarkRecipe: null,
    };
  },
  computed: {
    ...mapGetters(["savedRecipes", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchRecipes();
  },
  beforeDestroy() {
    if (this.unbookmarkRecipe) this.removeRecipe(this.unbookmarkRecipe);
  },
  methods: {
    ...mapActions(["fetchRecipes", "deleteRecipe"]),
    removeRecipe(recipe) {
      const removeRecipe = this.savedRecipes.find(
        (savedRecipe) =>
          savedRecipe.recipe_id === recipe.recipe_id &&
          savedRecipe.recipe_type === recipe.recipe_type
      );
      this.deleteRecipe(removeRecipe.id);
    },
    pushAddRecipe() {
      this.unbookmarkRecipe = null;
      this.isActive = !this.isActive;
    },
    pushDeleteRecipe(recipe) {
      this.unbookmarkRecipe = recipe;
      this.isActive = !this.isActive;
    },
  },
};
</script>
