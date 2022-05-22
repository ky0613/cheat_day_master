<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        v-if="existStore(store)"
        src="../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="removeStore(store)"
      />
      <img
        v-else
        src="../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        class="ml-auto md:mr-2 mr-0 cursor-pointer"
        @click="addStore(store)"
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
