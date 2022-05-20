<template>
  <div>
    <div class="flex items-center justify-center space-x-2 mb-3">
      <span class="h-px w-16 bg-gray-300"></span>
      <span class="text-gray-500 font-normal">または</span>
      <span class="h-px w-16 bg-gray-300"></span>
    </div>
    <a
      type="button"
      :href="twitterOauthUrl"
      class="block bg-twitter hover:bg-opacity-80 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
    >
      <div class="flex justify-center items-center">
        <img src="../../../public/img/twitter.svg" class="h-6 w-6 mr-3" />
        <p>Twitterでログインする</p>
      </div>
    </a>
  </div>
</template>

<script>
import axios from "../plugins/axios";

export default {
  data() {
    return {
      token: "",
    };
  },
  computed: {
    twitterOauthUrl() {
      return `https://api.twitter.com/oauth/authenticate?oauth_token=${this.token}`;
    },
  },
  mounted() {
    this.fetchOauthToken();
  },
  methods: {
    async fetchOauthToken() {
      const userResponse = await axios.get("oauth/twitter").catch((err) => {
        return null;
      });
      this.token = userResponse.data;
    },
  },
};
</script>
