<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        v-if="!unbookmarkStore"
        src="../../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="pushDeleteStores(store)"
      />
      <img
        v-else
        src="../../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="pushAddStores(store)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      unbookmarkStore: null,
    };
  },
  computed: {
    ...mapGetters(["savedStores", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchStores();
  },
  methods: {
    ...mapActions(["fetchStores"]),
    pushAddStores(store) {
      this.unbookmarkStore = null;
      this.$store.dispatch("bookmark/deleteStores", store);
    },
    pushDeleteStores(store) {
      this.unbookmarkStore = store;
      this.$store.dispatch("bookmark/setStores", store);
    },
  },
};
</script>
