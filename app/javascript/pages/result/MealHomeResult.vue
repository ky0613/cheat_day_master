<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3 mt-5">
      <p class="text-4xl font-bold">デリバリー可能な店舗情報</p>
      <p>
        配達中にカロリーは道に落ちるので，デリバリーされた食べ物により摂取したカロリーは0kcalです。
      </p>
      <p>安心して食事を楽しんでください。</p>
    </div>
    <StoreDataCard :stores="deliveryStoresData" :perPage="3" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天市場ランキングの食品情報</p>
      <p>
        評価によって店舗情報を並び替えたタイミングでカロリーが抜け落ちてしまったので，<br />こちらの食品から摂取したカロリーは0kcalです。
      </p>
      <p>安心してお取り寄せください</p>
    </div>
    <RakutenDataCard :items="allItems" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天市場ランキングのスイーツ情報</p>
      <p>
        ん〜，何故かはよく分かりませんが甘いので，こちらのスイーツから摂取したカロリーは0kcalです。
      </p>
      <p>安心してお取り寄せください</p>
    </div>
    <RakutenDataCard :items="allSweets" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天レシピランキングの情報</p>
      <p>
        自分で料理をすると食材と向き合うことになるので，こちらのレシピで作った料理の摂取カロリーは0kcalです。
      </p>
      <p>安心して料理に向き合ってください。</p>
    </div>
    <RakutenRecipesCard :recipes="allRecipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StoreDataCard from "../../components/StoreDataCard.vue";
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
    ...mapGetters("googleMealHomeStores", ["deliveryStoresData"]),
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
