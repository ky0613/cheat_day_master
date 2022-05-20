<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        src="../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        v-if="existStore(store)"
        @click="removeStore(store)"
        class="ml-auto mr-2 cursor-pointer"
      />
      <img
        src="../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        v-else
        @click="addStore(store)"
        class="ml-auto mr-2 cursor-pointer"
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
  computed: {
    ...mapGetters(["savedStores", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchStores();
  },
  methods: {
    ...mapActions(["fetchStores", "addStore", "deleteStore"]),
    existStore(store) {
      const check = (savedStore) => {
        return (
          savedStore.store_id === store.store_id &&
          savedStore.store_type === store.store_type
        );
      };
      return this.savedStores.some(check);
    },
    removeStore(store) {
      const removeStore = this.savedStores.find(
        (savedStore) =>
          savedStore.store_id === store.store_id &&
          savedStore.store_type === store.store_type
      );
      this.deleteStore(removeStore.id);
    },
  },
};
</script>
