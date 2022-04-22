<template>
  <header>
    <div class="p-4" id="header">
      <router-link :to="{ name: 'TopIndex' }" @click.native="resetState()"
        ><img src="logo-removebg-preview.png" alt="logo"
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
  background: rgb(6, 17, 60, 0.4);
}
</style>
