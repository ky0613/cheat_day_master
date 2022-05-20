<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        src="../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        v-if="existItem(item)"
        @click="removeItem(item)"
        class="ml-auto mr-2 cursor-pointer"
      />
      <img
        src="../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        v-else
        @click="addItem(item)"
        class="ml-auto mr-2 cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["savedItems", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchItems();
  },
  methods: {
    ...mapActions(["fetchItems", "addItem", "deleteItem"]),
    existItem(item) {
      const check = (savedItem) => {
        return savedItem.item_id === item.item_id;
      };
      return this.savedItems.some(check);
    },
    removeItem(item) {
      const removeItem = this.savedItems.find(
        (savedItem) => savedItem.item_id === item.item_id
      );
      this.deleteItem(removeItem.id);
    },
  },
};
</script>
