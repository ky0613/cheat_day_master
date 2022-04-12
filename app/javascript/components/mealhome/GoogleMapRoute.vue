<template>
  <div
    class="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-4 w-full"
  >
    <StoreDataCard :stores="this.$store.state.wayPoints" />
    <StoreDataCard :stores="this.$store.state.recommendStores" />
  </div>
</template>

<script>
import StoreDataCard from "./StoreDataCard.vue";

export default {
  components: {
    StoreDataCard,
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
