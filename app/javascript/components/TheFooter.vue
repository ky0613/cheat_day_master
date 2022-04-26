<template>
  <footer>
    <div class="text-center p-4 mx-auto">
      <ul class="flex justify-center gap-4">
        <router-link :to="{ name: 'Terms' }"
          ><li class="text-xs">利用規約</li></router-link
        >
        <router-link :to="{ name: 'Policy' }"
          ><li class="text-xs">プライバシーポリシー</li></router-link
        >
        <a href="https://twitter.com/engineer_newbie" target="_blank"
          ><li class="text-xs">開発者Twitter(お問い合わせ)</li></a
        >
      </ul>
      <small>Copyright &copy; 2022. チートデイマスター</small>
    </div>
  </footer>
</template>
