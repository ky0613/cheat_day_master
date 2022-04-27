<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2
        class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8"
      >
        新規登録
      </h2>
      <form class="max-w-lg border rounded-lg mx-auto bg-white">
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label
              for="email"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >名前</label
            >
            <input
              name="email"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              for="email"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >メールアドレス</label
            >
            <input
              name="email"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              for="email"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >パスワード</label
            >
            <input
              name="email"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              for="password"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >パスワード（確認）</label
            >
            <input
              name="password"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <button
            class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
          >
            新規登録する
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterIndex",
};
</script>
