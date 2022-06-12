<template>
  <div>
    <div class="flex items-center justify-center space-x-2 mb-3">
      <span class="h-px w-16 bg-gray-300"></span>
      <span class="text-gray-500 font-normal">または</span>
      <span class="h-px w-16 bg-gray-300"></span>
    </div>
    <div
      type="button"
      class="block bg-twitter hover:bg-opacity-80 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
      @click="twitterLogin"
    >
      <div class="flex justify-center items-center">
        <img src="../../../public/img/twitter.svg" class="h-6 w-6 mr-3" />
        <p>Twitterでログインする</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../plugins/axios";

export default {
  methods: {
    twitterLogin() {
      axios.get("oauth/twitter").then(res => {
        const url = res.data
        window.location.href = url
      })
    }
  },
};
</script>
