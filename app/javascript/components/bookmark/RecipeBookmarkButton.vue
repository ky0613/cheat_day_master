<template>
  <div class="ml-auto mt-auto mb-2 mr-2">
    <div v-if="authUser">
      <img
        v-if="!unbookmarkRecipe"
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
      unbookmarkRecipe: null,
    };
  },
  computed: {
    ...mapGetters(["savedRecipes", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchRecipes();
  },
  methods: {
    ...mapActions(["fetchRecipes"]),
    pushAddRecipe(recipe) {
      this.unbookmarkRecipe = null;
      this.$store.dispatch("bookmark/deleteRecipes", recipe);
    },
    pushDeleteRecipe(recipe) {
      this.unbookmarkRecipe = recipe;
      this.$store.dispatch("bookmark/setRecipes", recipe);
    },
  },
};
</script>
