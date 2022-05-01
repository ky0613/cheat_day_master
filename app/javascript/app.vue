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
  background: linear-gradient(
    130deg,
    rgba(250, 112, 112, 0.8),
    rgba(175, 254, 64, 0.611)
  );
  background-size: cover;
}
</style>
