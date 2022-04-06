module.exports = {
  test: /\.vue(\.erb)?$/,
  use: [
    {
      loader: "vue-loader",
    },
  ],
  devServer: {
    proxy: {
      "/api/": {
        target: "http://webservice.recruit.co.jp",
      },
    },
  },
};
