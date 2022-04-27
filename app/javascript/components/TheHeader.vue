<template>
  <header>
    <div class="pl-4 py-2 flex justify-between" id="header">
      <router-link
        :to="{ name: 'TopIndex' }"
        @click.native="resetState()"
        class="inline-block"
        ><img src="../../../public/logo.png" alt="logo" class="max-w-xs h-auto"
      /></router-link>
      <template v-if="!authUser">
        <nav class="pr-4 py-2">
          <router-link
            :to="{ name: 'LoginIndex' }"
            class="text-white mr-2 text-lg"
          >
            ログイン
          </router-link>
          <router-link
            :to="{ name: 'RegisterIndex' }"
            class="text-white text-lg"
          >
            新規登録
          </router-link>
        </nav>
      </template>
      <template v-else>
        <router-link
          :to="{ name: 'TopIndex' }"
          class="text-white text-lg"
          @click.native="handleLogout"
        >
          ログアウト
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["authUser"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    async handleLogout() {
      try {
        await this.logoutUser();
        this.$route.push({ name: 'TopIndex' });
      } catch (error) {
        console.log(error);
      }
    },
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
