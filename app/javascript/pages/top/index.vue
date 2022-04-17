<template>
  <div class="ml-10">
    <div class="flex flex-col mb-20">
      <div class="italic items-center">
        <h1 class="text-6xl">Over the CheatDay</h1>
        <h1 class="text-3xl">〜チートデイの向こう側へ〜</h1>
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <div class="flex items-center mb-10">
        <img src="Best_place.svg" class="max-w-1/4 h-auto mb-10 mr-10" />
        <router-link
          :to="{ name: 'MealOut' }"
          class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white text-xl"
          >外食でチートデイ</router-link
        >
      </div>
      <div class="flex items-center">
        <img src="at_home.svg" class="max-w-1/4 h-auto mb-10 mr-10" />
        <router-link
          :to="{ name: 'MealHome' }"
          class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white text-xl"
          >自宅でチートデイ</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopIndex",
};
</script>
