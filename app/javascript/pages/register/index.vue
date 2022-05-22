<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2
        class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8"
      >
        新規登録
      </h2>
      <div class="max-w-lg border rounded-lg mx-auto bg-white">
        <ValidationObserver v-slot="ObserverProps">
          <div class="flex flex-col gap-4 p-4 md:p-8">
            <ValidationProvider rules="required|max:25">
              <div slot-scope="ProviderProps">
                <label
                  for="name"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  placeholder="username"
                  >名前</label
                >
                <input
                  v-model="user.name"
                  name="名前"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeholder="name"
                  autocomplete="username"
                />
                <span class="text-red-500 text-center">{{
                  ProviderProps.errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|email">
              <div slot-scope="ProviderProps">
                <label
                  for="メール"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >メールアドレス</label
                >
                <input
                  v-model="user.email"
                  name="メールアドレス"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeholder="test@example.com"
                  autocomplete="email"
                  type="email"
                />
                <span class="text-red-500 text-center">{{
                  ProviderProps.errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|min:6">
              <div slot-scope="ProviderProps">
                <label
                  for="password"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >パスワード</label
                >
                <input
                  v-model="user.password"
                  name="パスワード"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeholder="password"
                  autocomplete="new-password"
                  type="password"
                />
                <span class="text-red-500 text-center">{{
                  ProviderProps.errors[0]
                }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="required|min:6" mode="aggressive">
              <div slot-scope="ProviderProps">
                <label
                  for="password-confirmation"
                  class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                  >パスワード（確認）</label
                >
                <input
                  v-model="user.password_confirmation"
                  name="パスワード"
                  class="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  placeholder="password"
                  autocomplete="new-password"
                  type="password"
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
              @click="register"
            >
              新規登録する
            </button>
            <span class="text-red-500 text-center">{{ errorMessage }}</span>
            <TwitterLoginButton />
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../plugins/axios";
import TwitterLoginButton from "../../components/TwitterLoginButton.vue";

export default {
  name: "RegisterIndex",
  components: {
    TwitterLoginButton,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    register() {
      axios
        .post("users", { user: this.user })
        .then(() => {
          this.$store.dispatch("setFlash", {
            type: "success",
            message: "登録しました。",
          });
          this.$router.push({ name: "LoginIndex" });
        })
        .catch((error) => {
          console.log(error.response);
          this.errorMessage = error.response.data.errors.detail;
          this.$store.dispatch("setFlash", {
            type: "error",
            message: "登録に失敗しました。",
          });
        });
    },
  },
};
</script>
