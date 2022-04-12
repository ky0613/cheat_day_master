<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <StoreDataCard :stores="this.$store.state.wayPoints" />
    <StoreDataCard :stores="this.$store.state.recommendStores" />
    <RakutenDataCard :items="allItems" />
    <RakutenRecipesCard :recipes="allRecipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StoreDataCard from "../../components/mealhome/StoreDataCard.vue";
import RakutenDataCard from "../../components/mealout/RakutenDataCard.vue";
import RakutenRecipesCard from "../../components/mealhome/RakutenRecipesCard.vue";

export default {
  name: "MealOutResult",
  components: {
    StoreDataCard,
    RakutenDataCard,
    RakutenRecipesCard,
  },
  computed: {
    ...mapGetters(["allItems", "allRecipes"]),
  },
  created() {
    this.fetchItems();
    this.fetchRecipes();
  },
  methods: {
    ...mapActions(["fetchItems", "fetchRecipes"]),
  },
};
</script>
