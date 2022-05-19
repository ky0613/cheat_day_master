<template>
  <transition name="fade">
    <div class="fixed top-24 right-10 max-w-xs z-1000">
      <div v-if="flash.type === 'success'">
        <div
          class="border border-green-400 rounded bg-green-100 px-4 py-3 text-green-700"
        >
          {{ flash.message }}
        </div>
      </div>
      <div v-if="flash.type === 'error'">
        <div
          class="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700"
        >
          {{ flash.message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["flash"]),
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setFlash", {
        type: "",
        flash: "",
      });
    }, 2000);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
