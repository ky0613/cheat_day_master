<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2
        class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8"
      >
        新規登録
      </h2>
      <div class="max-w-lg border rounded-lg mx-auto bg-white">
        <div class="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label
              for="name"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              placeholder="username"
              >名前</label
            >
            <input
              name="name"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              placeholder="name"
              autocomplete="username"
              v-model="user.name"
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
              placeholder="test@example.com"
              autocomplete="email"
              type="email"
              v-model="user.email"
            />
          </div>
          <div>
            <label
              for="password"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >パスワード</label
            >
            <input
              name="password"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              placeholder="password"
              autocomplete="new-password"
              type="password"
              v-model="user.password"
            />
          </div>
          <div>
            <label
              for="password-confirmation"
              class="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >パスワード（確認）</label
            >
            <input
              name="password-confirmation"
              class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              placeholder="password"
              autocomplete="new-password"
              type="password"
              v-model="user.password_confirmation"
            />
          </div>
          <button
            type="submit"
            class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            @click="register"
          >
            新規登録する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../plugins/axios";

export default {
  name: "RegisterIndex",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    register() {
      axios
        .post("users", { user: this.user })
        .then((res) => {
          this.$router.push({ name: "LoginIndex" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
