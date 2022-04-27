<template>
  <header>
    <div class="pl-4 py-2 flex justify-between" id="header">
      <router-link
        :to="{ name: 'TopIndex' }"
        @click.native="resetState()"
        class="inline-block"
        ><img src="../../../public/logo.png" alt="logo" class="max-w-xs h-auto"
      /></router-link>
      <nav class="pr-4 py-2">
        <router-link
          :to="{ name: 'LoginIndex' }"
          class="text-white mr-2 text-lg"
        >
          ログイン
        </router-link>
        <router-link :to="{ name: 'RegisterIndex' }" class="text-white text-lg">
          新規登録
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    resetState() {
      this.$store.commit("googleMealOutStores/resetState");
      this.$store.commit("googleMealHomeStores/resetState");
      localStorage.removeItem("cheatDayMaster");
    },
  },
};
</script>

<style scoped>
#header {
  background: rgb(6, 17, 60, 0.7);
}
</style>
