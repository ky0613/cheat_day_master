<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <p
        class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8"
      >
        ログイン
      </p>
      <div class="max-w-lg border rounded-lg mx-auto bg-white">
        <ValidationObserver v-slot="ObserverProps">
          <div class="flex flex-col gap-4 p-4 md:p-8">
            <ValidationProvider rules="required|email">
              <div slot-scope="ProviderProps">
                <label
                  for="email"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >メールアドレス</label
                >
                <input
                  name="メールアドレス"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeholder="test@example.com"
                  autocomplete="email"
                  type="email"
                  v-model="user.email"
                />
                <span class="text-red-500 text-center">{{
                  ProviderProps.errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|min:6" mode="aggressive">
              <div slot-scope="ProviderProps">
                <label
                  for="password"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >パスワード</label
                >
                <input
                  name="パスワード"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  type="password"
                  placeholder="password"
                  autocomplete="new-password"
                  v-model="user.password"
                />
                <span class="text-red-500 text-center">{{
                  ProviderProps.errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <button
              type="button"
              class="block bg-orange-300 hover:bg-orange-400 disabled:bg-orange-200 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
              @click="login"
            >
              ログインする
            </button>
            <span class="text-red-500 text-center">{{ errorMessage }}</span>
            <p class="text-center my-3">
              パスワードをお忘れの方は
              <router-link
                :to="{ name: 'ResetPasswordCreate' }"
                class="text-blue-800 hover:text-blue-400"
                >こちら</router-link
              >
            </p>
            <TwitterLoginButton />
            <div class="flex justify-center items-center bg-gray-100 p-4">
              <p class="text-gray-500 text-sm text-center">
                まだアカウントを作成してない方は
                <router-link
                  :to="{ name: 'RegisterIndex' }"
                  class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                  >新規登録へ</router-link
                >
              </p>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TwitterLoginButton from "../../components/TwitterLoginButton.vue";

export default {
  name: "LoginIndex",
  components: {
    TwitterLoginButton,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["loginUser", "fetchUser"]),
    async login() {
      try {
        await this.loginUser(this.user);
        this.$store.dispatch("setFlash", {
          type: "success",
          message: "ログインしました。",
        });
        this.$router.push({ name: "TopIndex" });
      } catch (error) {
        this.$store.dispatch("setFlash", {
          type: "error",
          message: "ログインに失敗しました。",
        });
        this.errorMessage = error.response.data.errors.detail;
      }
    },
  },
};
</script>
