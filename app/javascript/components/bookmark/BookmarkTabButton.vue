<template>
  <button type="button" class="rounded-sm h-12" @click="changeTab">
    <div
      class="flex hover:text-red-800 border-b-2 border-zinc-500 md:pb-5 pb-2 md:px-10 px-4"
      :class="{
        'border-red-800': isActive === bookmarkType,
        'text-red-800': isActive === bookmarkType,
      }"
    >
      <p class="md:text-xl text-xs"><slot name="tabKind"></slot></p>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    bookmarkType: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeTab() {
      this.$emit("change-tab", this.bookmarkType);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

p {
  font-family: "Yomogi", cursive;
}
</style>
