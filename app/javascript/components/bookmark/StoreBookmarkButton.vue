<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        v-if="isActive"
        src="../../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="pushDeleteStore(store)"
      />
      <img
        v-else
        src="../../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="pushAddStore"
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
      isActive: true,
      unbookmarkStore: null,
    }
  },
  computed: {
    ...mapGetters(["savedStores", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchStores();
  },
  beforeDestroy() {
    if (this.unbookmarkStore) this.removeStore(this.unbookmarkStore)
  },
  methods: {
    ...mapActions(["fetchStores", "deleteStore"]),
    removeStore(store) {
      const removeStore = this.savedStores.find(
        (savedStore) =>
          savedStore.store_id === store.store_id &&
          savedStore.store_type === store.store_type
      );
      this.deleteStore(removeStore.id);
    },
    pushAddStore() {
      this.unbookmarkStore = null;
      this.isActive = !this.isActive
    },
    pushDeleteStore(store) {
      this.unbookmarkStore = store
      this.isActive = !this.isActive
    },
  },
};
</script>
