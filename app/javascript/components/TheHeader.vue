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
          <button
            class="text-white mr-2 text-lg hover:text-green-400"
            id="nav-font"
            @click="changeActiveDescriptionModal"
          >
            サービス概要
          </button>
          <router-link
            :to="{ name: 'LoginIndex' }"
            class="text-white mr-2 text-lg hover:text-green-400"
            id="nav-font"
          >
            ログイン
          </router-link>
          <router-link
            :to="{ name: 'RegisterIndex' }"
            class="text-white text-lg hover:text-green-400"
            id="nav-font"
          >
            新規登録
          </router-link>
        </nav>
      </template>
      <template v-else>
        <nav class="pr-4 py-2">
          <button
            class="text-white mr-2 text-lg hover:text-green-400"
            id="nav-font"
            @click="changeActiveDescriptionModal"
          >
            サービス概要
          </button>
          <router-link
            :to="{ name: 'BookmarkIndex' }"
            class="text-white text-lg hover:text-green-400"
            id="nav-font"
          >
            ブックマーク一覧
          </router-link>
          <router-link
            :to="{ name: 'TopIndex' }"
            class="text-white text-lg hover:text-green-400"
            id="nav-font"
            @click.native="handleLogout"
          >
            ログアウト
          </router-link>
        </nav>
      </template>
      <transition>
        <DescriptionModal
          v-if="isModalActive"
          @close-modal="changeActiveDescriptionModal"
        />
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DescriptionModal from "./DescriptionModal.vue";

export default {
  components: { DescriptionModal },
  data() {
    return {
      isModalActive: false,
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    async handleLogout() {
      try {
        await this.logoutUser();
        this.resetState();
      } catch (error) {
        console.log(error);
      }
    },
    resetState() {
      this.$store.commit("googleMealOutStores/resetState");
      this.$store.commit("googleMealHomeStores/resetState");
      this.$store.commit("resetRakutenState");
      this.$store.commit("resetRecipesState");
      localStorage.removeItem("cheatDayMaster");
    },
    changeActiveDescriptionModal() {
      this.isModalActive = !this.isModalActive;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

#header {
  background: rgb(6, 17, 60, 0.7);
}

#nav-font {
  font-family: "Yomogi", cursive;
}
</style>
