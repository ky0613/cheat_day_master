<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <div class="p-3 md:mt-5 mt-2">
      <p class="md:text-4xl text-xl font-bold">デリバリー可能な店舗情報</p>
      <p class="md:text-base text-xs">
        配達中にカロリーは道に落ちるので，摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[0] }}
      </p>
    </div>
    <StoreDataCard
      v-if="deliveryStoresData.length !== 0"
      :stores="deliveryStoresData"
    />
    <p v-else class="md:text-6xl text-xl font-bold text-center my-24">
      ごめんなさい，<br />お店が見つかりません。
    </p>
    <div class="p-3 mt-2">
      <p class="md:text-4xl text-xl font-bold">楽天市場ランキングの食品情報</p>
      <p class="md:text-base text-xs">
        ランキングが高いとみんなに支持されているということはカロリーが分散するので、摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[1] }}
      </p>
    </div>
    <RakutenDataCard :items="allItems" />
    <div class="p-3 mt-2">
      <p class="md:text-4xl text-xl font-bold">
        楽天市場ランキングのスイーツ情報
      </p>
      <p class="md:text-base text-xs">
        ん〜，何故かはよく分かりませんが甘いので，摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[2] }}
      </p>
    </div>
    <RakutenDataCard :items="allSweets" />
    <div class="p-3 mt-2">
      <p class="md:text-4xl text-xl font-bold">楽天レシピランキングの情報</p>
      <p class="md:text-base text-xs">
        自分で料理をすると食材と向き合うことになるので，作った料理の摂取カロリーは<span
          class="md:text-3xl text-sm font-bold"
          >0kcal</span
        >です。
      </p>
      <p v-if="digressions" class="md:text-2xl text-sm font-bold">
        余談ですが，{{ digressions[3] }}
      </p>
    </div>
    <RakutenRecipesCard :recipes="allRecipes" />
    <div class="my-6 w-full text-center">
      <router-link
        :to="{ name: 'TopIndex' }"
        class="rounded-lg bg-orange-300 hover:bg-orange-400 text-center py-2 px-9"
        >ホームに戻る</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoreDataCard from "../../components/StoreDataCard.vue";
import RakutenDataCard from "../../components/mealhome/RakutenDataCard.vue";
import RakutenRecipesCard from "../../components/mealhome/RakutenRecipesCard.vue";
import axios from "../../plugins/axios";

export default {
  name: "MealHomeResult",
  components: {
    StoreDataCard,
    RakutenDataCard,
    RakutenRecipesCard,
  },
  data() {
    return {
      digressions: [],
    };
  },
  computed: {
    ...mapGetters(["allItems", "allRecipes", "allSweets"]),
    ...mapGetters("googleMealHomeStores", ["deliveryStoresData"]),
  },
  async mounted() {
    await this.fetchDigressions();
  },
  methods: {
    async fetchDigressions() {
      const response = await axios.get("digressions");
      let digressions = [];
      response.data.forEach((item) => {
        digressions.push(item.description);
      });
      this.digressions = digressions;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

p {
  font-family: "Yomogi", cursive;
}
</style>
