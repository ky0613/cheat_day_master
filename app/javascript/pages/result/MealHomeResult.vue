<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <StoreDataCard :stores="this.$store.state.recommendStores" />
    <RakutenDataCard :items="allItems" />
    <RakutenDataCard :items="allSweets" />
    <RakutenRecipesCard :recipes="allRecipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StoreDataCard from "../../components/mealhome/StoreDataCard.vue";
import RakutenDataCard from "../../components/mealhome/RakutenDataCard.vue";
import RakutenRecipesCard from "../../components/mealhome/RakutenRecipesCard.vue";

export default {
  name: "MealOutResult",
  components: {
    StoreDataCard,
    RakutenDataCard,
    RakutenRecipesCard,
  },
  computed: {
    ...mapGetters(["allItems", "allRecipes", "allSweets"]),
  },
  created() {
    this.fetchItems();
    this.fetchRecipes();
    this.fetchSweets();
  },
  methods: {
    ...mapActions(["fetchItems", "fetchRecipes", "fetchSweets"]),
  },
};
</script>
