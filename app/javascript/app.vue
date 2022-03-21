<template>
  <div id="app">
    <body class="flex flex-col min-h-screen">
      <TheHeader />
      <main class="flex-grow h-0">
        <router-view />
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

<style scoped></style>
