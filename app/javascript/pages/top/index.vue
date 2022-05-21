<template>
  <div class="ml-3 flex flex-col">
    <div class="flex flex-col md:mb-10 mb-8">
      <div class="items-center">
        <h1 class="permanent md:text-8xl text-4xl mt-4">Over the CheatDay</h1>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col justify-center">
        <div>
          <p class="md:text-2xl text-l font-extrabold md:mb-20 mb-8">
            仕事に勉強に疲れているそこのあなた。<br />
            1日ぐらい，食べ物のことだけを考えませんか？
          </p>
        </div>
        <div
          class="flex md:flex-row items-center mb-10 justify-center flex-col"
        >
          <img
            src="../../../../public/img/Best_place.svg"
            class="md:max-w-1/2 h-auto md:mb-10 md:mr-10 mb-5 w-2/5"
          />
          <router-link
            :to="{ name: 'MealOut' }"
            class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white md:text-xl font-bold text-sm"
            id="sans"
            >外食でチートデイ</router-link
          >
        </div>
        <div class="flex md:flex-row items-center justify-center flex-col">
          <img
            src="../../../../public/img/at_home.svg"
            class="md:max-w-1/2 h-auto md:mb-10 md:mr-10 mb-5 w-2/5"
          />
          <router-link
            :to="{ name: 'MealHome' }"
            class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white md:text-xl font-bold text-sm"
            id="sans"
            >自宅でチートデイ</router-link
          >
        </div>
      </div>
      <img
        src="../../../../public/img/undraw_healthy_options_re_lf9l.svg"
        class="md:w-1/2 md:flex hidden"
      />
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
}

p {
  font-family: "Yomogi", cursive;
}

#sans {
  font-family: "Yomogi", cursive;
}
</style>
