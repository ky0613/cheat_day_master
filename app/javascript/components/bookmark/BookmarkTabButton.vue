<template>
  <button type="button" @click="changeTab" class="rounded-sm h-12">
    <div
      class="flex hover:text-red-800 border-b-2 border-zinc-500 pb-5 px-10"
      :class="{
        'border-red-800': isActive === bookmarkType,
        'text-red-800': isActive === bookmarkType,
      }"
    >
      <p class="text-xl"><slot name="tabKind"></slot></p>
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
