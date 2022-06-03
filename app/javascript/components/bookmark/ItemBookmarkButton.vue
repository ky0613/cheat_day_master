<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        v-if="isActive"
        src="../../../../public/img/bookmark_added_black_24dp.svg"
        alt="bookmark"
        class="ml-auto mr-2 cursor-pointer"
        @click="pushDeleteItem(item)"
      />
      <img
        v-else
        src="../../../../public/img/bookmark_add_black_24dp.svg"
        alt="bookmark"
        class="ml-auto mr-2 cursor-pointer"
        @click="pushAddItem"
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
  data() {
    return {
      isActive: true,
      unbookmarkItem: null,
    }
  },
  computed: {
    ...mapGetters(["savedItems", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchItems();
  },
  destroyed() {
    if (this.unbookmarkItem) this.removeItem(this.unbookmarkItem)
  },
  methods: {
    ...mapActions(["fetchItems", "deleteItem"]),
    async removeItem(item) {
      const removeItem = this.savedItems.find(
        (savedItem) => savedItem.item_id === item.item_id
      );
      await this.deleteItem(removeItem.id);
    },
    pushAddItem() {
      this.unbookmarkItem = null;
      this.isActive = !this.isActive
    },
    pushDeleteItem(item) {
      this.unbookmarkItem = item
      this.isActive = !this.isActive
    },
  },
};
</script>
