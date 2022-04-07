module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://webservice.recruit.co.jp",
        },
      },
    },
  },
};
