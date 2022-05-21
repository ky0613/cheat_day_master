<template>
  <footer>
    <div class="text-center p-4 mx-auto">
      <ul class="flex justify-center md:gap-4 gap-0 md:flex-row flex-col">
        <li class="text-xs hover:text-orange-400">
          <router-link :to="{ name: 'Terms' }">利用規約</router-link>
        </li>
        <li class="text-xs hover:text-orange-400">
          <router-link :to="{ name: 'Policy' }">
            プライバシーポリシー
          </router-link>
        </li>
        <li class="text-xs hover:text-orange-400">
          <a href="https://twitter.com/engineer_newbie" target="_blank">
            開発者Twitter(お問い合わせ)
          </a>
        </li>
      </ul>

      <small>Copyright &copy; 2022. チートデイマスター</small>
    </div>
  </footer>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yomogi&display=swap");

li,
small {
  font-family: "Yomogi", cursive;
}
</style>
