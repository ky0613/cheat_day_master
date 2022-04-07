module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://webservice.recruit.co.jp",
      },
    },
  },
};
