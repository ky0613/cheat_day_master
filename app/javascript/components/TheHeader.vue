<template>
  <header>
    <div class="flex justify-between p-4" id="header">
      <img src="favicon.png" alt="logo" />
      <router-link :to="{ name: 'TopIndex' }"
        ><h1>チートデイマスター</h1></router-link
      >
    </div>
  </header>
</template>

<style scoped>
#header {
  background: rgba(15, 37, 64, 0.6);
}
</style>
