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
        <router-link :to="{ name: 'Contact' }"
          ><li class="text-xs">お問い合わせ</li></router-link
        >
      </ul>
      <small>Copyright &copy; 2022. チートデイマスター</small>
    </div>
  </footer>
</template>
