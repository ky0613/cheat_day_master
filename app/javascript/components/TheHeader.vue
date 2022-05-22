<template>
  <header @click.self="closeMenu">
    <div id="header" class="pl-4 py-2 flex justify-between items-center">
      <router-link
        :to="{ name: 'TopIndex' }"
        class="inline-block"
        @click.native="resetState()"
      >
        <img
          src="../../../public/img/logo.png"
          alt="logo"
          class="md:w-72 w-40 h-auto"
        />
      </router-link>
      <div class="md:hidden flex items-center">
        <p v-if="authUser" id="nav-font" class="text-sm text-white mr-2">
          {{ authUser.name }}さん
        </p>
        <button
          class="mr-2 bg-orange-400 py-1 px-2 rounded"
          @click="toggleNavbar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <template v-if="!authUser">
        <ul
          class="md:pr-4 md:py-2 md:flex md:gap-4"
          :class="{
            hidden: !isShowMenu,
            'absolute z-30 right-0 top-12 p-3 bg-white rounded': isShowMenu,
          }"
        >
          <li>
            <button
              id="nav-font"
              class="md:text-white md:text-lg text-sm hover:text-green-400"
              @click="changeActiveDescriptionModal"
            >
              サービス概要
            </button>
          </li>
          <li>
            <router-link
              id="nav-font"
              :to="{ name: 'LoginIndex' }"
              class="md:text-white md:text-lg text-sm hover:text-green-400"
            >
              ログイン
            </router-link>
          </li>
          <li>
            <router-link
              id="nav-font"
              :to="{ name: 'RegisterIndex' }"
              class="md:text-white md:text-lg text-sm hover:text-green-400"
            >
              新規登録
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul
          class="md:pr-4 md:py-2 md:flex md:gap-4"
          :class="{
            hidden: !isShowMenu,
            'absolute z-30 right-0 top-12 p-3 bg-white rounded': isShowMenu,
          }"
        >
          <li>
            <button
              id="nav-font"
              class="md:text-white md:mr-2 md:text-lg text-sm hover:text-green-400"
              @click="changeActiveDescriptionModal"
            >
              サービス概要
            </button>
          </li>
          <li>
            <router-link
              id="nav-font"
              :to="{ name: 'BookmarkIndex' }"
              class="md:text-white md:text-lg text-sm hover:text-green-400"
            >
              ブックマーク一覧
            </router-link>
          </li>
          <li>
            <router-link
              id="nav-font"
              :to="{ name: 'TopIndex' }"
              class="md:text-white md:text-lg text-sm hover:text-green-400"
              @click.native="handleLogout"
            >
              ログアウト
            </router-link>
          </li>
        </ul>
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
      isShowMenu: false,
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
  },
  watch: {
    $route() {
      this.closeMenu();
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions(["logoutUser"]),
    handleResize() {
      if (window.innerWidth >= 768) {
        this.closeMenu();
      }
    },
    toggleNavbar() {
      this.isShowMenu = !this.isShowMenu;
    },
    async handleLogout() {
      try {
        await this.logoutUser();
        this.$store.dispatch("setFlash", {
          type: "success",
          message: "ログアウトしました。",
        });
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
      this.closeMenu();
    },
    closeMenu() {
      this.isShowMenu = false;
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
