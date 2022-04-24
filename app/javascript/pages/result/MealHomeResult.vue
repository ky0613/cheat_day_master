<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3 mt-5">
      <p class="text-4xl font-bold">デリバリー可能な店舗情報</p>
      <p>
        配達中にカロリーは道に落ちるので，デリバリーされた食べ物による摂取カロリーは0kcalです。
      </p>
      <p>安心して食事を楽しんでください。</p>
      <p v-if="allDescriptions">余談ですが，{{ allDescriptions[0] }}</p>
    </div>
    <StoreDataCard :stores="deliveryStoresData" :perPage="3" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天市場ランキングの食品情報</p>
      <p>
        ランキングが高いとみんなに支持されているということなのでカロリーが分散します。<br />そのため，こちらの食品から摂取したカロリーは0kcalです。
      </p>
      <p>安心してお取り寄せください</p>
      <p v-if="allDescriptions">余談ですが，{{ allDescriptions[1] }}</p>
    </div>
    <RakutenDataCard :items="allItems" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天市場ランキングのスイーツ情報</p>
      <p>
        ん〜，何故かはよく分かりませんが甘いので，こちらのスイーツから摂取したカロリーは0kcalです。
      </p>
      <p>安心してお取り寄せください</p>
      <p v-if="allDescriptions">余談ですが，{{ allDescriptions[2] }}</p>
    </div>
    <RakutenDataCard :items="allSweets" />
    <div class="p-3 mt-2">
      <p class="text-4xl font-bold">楽天レシピランキングの情報</p>
      <p>
        自分で料理をすると食材と向き合うことになるので，こちらのレシピで作った料理の摂取カロリーは0kcalです。
      </p>
      <p>安心して料理に向き合ってください。</p>
      <p v-if="allDescriptions">余談ですが，{{ allDescriptions[3] }}</p>
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
    ...mapGetters(["allItems", "allRecipes", "allSweets", "allDescriptions"]),
    ...mapGetters("googleMealHomeStores", ["deliveryStoresData"]),
  },
  created() {
    this.fetchItems();
    this.fetchRecipes();
    this.fetchSweets();
    this.fetchDescriptions();
  },
  methods: {
    ...mapActions([
      "fetchItems",
      "fetchRecipes",
      "fetchSweets",
      "fetchDescriptions",
    ]),
  },
};
</script>
