<template>
  <div id="app">
    <body class="flex flex-col min-h-screen">
      <TheHeader />
      <TheFlashMessage v-if="isFlash" />
      <main class="flex flex-1">
        <div class="mx-auto md:max-w-4xl max-w-sm w-full">
          <router-view />
        </div>
      </main>
      <TheFooter />
    </body>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";
import TheFlashMessage from "./components/TheFlashMessage.vue";
import axios from "./plugins/axios";
import { mapGetters } from "vuex";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheFlashMessage,
  },
  computed: {
    ...mapGetters(["isFlash"]),
  },
  mounted() {
    axios.get("sessions");
  },
};
</script>

<style scoped>
#app {
  background: linear-gradient(
    130deg,
    rgba(250, 112, 112, 0.8),
    rgba(175, 254, 64, 0.611)
  );
  background-size: cover;
}
</style>
