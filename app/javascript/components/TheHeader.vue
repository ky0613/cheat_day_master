<template>
  <header>
    <div class="pl-4 py-2" id="header">
      <router-link
        :to="{ name: 'TopIndex' }"
        @click.native="resetState()"
        class="inline-block"
        ><img src="../../../public/logo.png" alt="logo" class="max-w-xs h-auto"
      /></router-link>
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
