<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div>
        <div class="flex flex-col items-center mb-10">
          <div>
            <img src="Best_place.svg" class="max-w-xs h-auto mb-10" />
          </div>
          <div>
            <router-link
              :to="{ name: 'MealOut' }"
              class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white"
              >外食でチートデイ</router-link
            >
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div>
            <img src="at_home.svg" class="max-w-xs h-auto mb-10" />
          </div>
          <div>
            <router-link
              :to="{ name: 'MealHome' }"
              class="rounded-lg bg-orange-500 p-2 text-center hover:bg-orange-300 text-white"
              >自宅でチートデイ</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopIndex",
};
</script>
