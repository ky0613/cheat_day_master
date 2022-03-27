const { environment } = require("@rails/webpacker");
const { VueLoaderPlugin } = require("vue-loader");
const vue = require("./loaders/vue");

const dotenv = require("dotenv");
const webpack = require("webpack");

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  ".env.local",
  `.env.${process.env.NODE_ENV}`,
  ".env",
];
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.prepend("VueLoaderPlugin", new VueLoaderPlugin());
environment.loaders.prepend("vue", vue);
environment.plugins.prepend(
  "Environment",
  new webpack.EnvironmentPlugin(process.env),
  { passive: true }
);

module.exports = environment;
