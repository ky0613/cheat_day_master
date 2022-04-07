module.exports = {
  devServer: {
    proxy: {
      "/api": "http://webservice.recruit.co.jp",
    },
  },
};
