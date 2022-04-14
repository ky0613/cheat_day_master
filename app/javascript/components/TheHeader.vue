<template>
  <header>
    <div class="flex justify-between bg-green-200 p-4">
      <img src="favicon.png" alt="logo" />
      <router-link :to="{ name: 'TopIndex' }"
        ><h1>チートデイマスター</h1></router-link
      >
      <nav>
        <ul class="flex gap-4">
          <li>ログイン</li>
          <li>新規機能</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script></script>
