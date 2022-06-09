<template>
  <div class="w-full">
    <div v-if="authUser">
      <img
        v-if="!unbookmarkItem"
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
        @click="pushAddItem(item)"
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
      unbookmarkItem: null,
    };
  },
  computed: {
    ...mapGetters(["savedItems", "authUser"]),
  },
  mounted() {
    if (this.authUser) this.fetchItems();
  },
  methods: {
    ...mapActions(["fetchItems"]),
    pushAddItem(item) {
      this.unbookmarkItem = null;
      this.$store.dispatch("bookmark/deleteItems", item);
    },
    pushDeleteItem(item) {
      this.unbookmarkItem = item;
      this.$store.dispatch("bookmark/setItems", item);
    },
  },
};
</script>
