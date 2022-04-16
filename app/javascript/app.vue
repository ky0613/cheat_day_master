<template>
  <div id="app">
    <body class="flex flex-col min-h-screen">
      <TheHeader />
      <main class="flex flex-1">
        <div class="m-auto max-w-4xl w-full">
          <router-view />
        </div>
      </main>
      <TheFooter />
    </body>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
#app {
  background: rgba(230, 213, 184, 0.6);
}
</style>
