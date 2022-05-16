<template>
  <div>
    <LoadingPacman />
  </div>
</template>

<script>
import LoadingPacman from "../../components/LoadingPacmanPage.vue";
import axios from "../../plugins/axios";

export default {
  components: {
    LoadingPacman,
  },
  async mounted() {
    const userResponse = await axios.post("oauth/callback", {
      provider: "twitter",
      oauth_token: this.$route.query.oauth_token,
      oauth_verifier: this.$route.query.oauth_verifier,
    });
    this.$store.dispatch("loginUser", userResponse.data);
    this.$router.push({ name: "TopIndex" });
  },
};
</script>
