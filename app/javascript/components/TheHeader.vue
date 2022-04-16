<template>
  <header>
    <div class="flex justify-between p-4" id="header">
      <router-link :to="{ name: 'TopIndex' }"
        ><img src="logo-removebg-preview.png" alt="logo"
      /></router-link>
    </div>
  </header>
</template>

<style scoped>
#header {
  background: rgb(6, 17, 60, 0.4);
}
</style>
