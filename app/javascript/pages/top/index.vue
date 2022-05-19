<template>
  <div class="ml-3">
    <div class="flex flex-col mb-10">
      <div class="items-center">
        <h1 class="permanent">Over the CheatDay</h1>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col justify-center">
        <div>
          <p class="text-2xl font-extrabold text-black mb-20">
            仕事に勉強に疲れているそこのあなた。<br />
            1日ぐらい，食べ物のことだけを考えませんか？
          </p>
        </div>
        <div class="flex items-center mb-10">
          <img src="Best_place.svg" class="max-w-1/2 h-auto mb-10 mr-10" />
          <router-link
            :to="{ name: 'MealOut' }"
            class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white text-xl font-bold"
            id="sans"
            >外食でチートデイ</router-link
          >
        </div>
        <div class="flex items-center">
          <img src="at_home.svg" class="max-w-1/2 h-auto mb-10 mr-10" />
          <router-link
            :to="{ name: 'MealHome' }"
            class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white text-xl font-bold"
            id="sans"
            >自宅でチートデイ</router-link
          >
        </div>
      </div>
      <img src="undraw_healthy_options_re_lf9l.svg" class="w-1/2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TopIndex",
  mounted() {
    this.resetState();
  },
  methods: {
    resetState() {
      this.$store.commit("googleMealOutStores/resetState");
      this.$store.commit("googleMealHomeStores/resetState");
      this.$store.commit("resetRakutenState");
      this.$store.commit("resetRecipesState");
      localStorage.removeItem("cheatDayMaster");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

.permanent {
  font-family: "Permanent Marker", cursive;
  font-size: 80px;
}

p {
  font-family: "Yomogi", cursive;
}

#sans {
  font-family: "Yomogi", cursive;
}
</style>
