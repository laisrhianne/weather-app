module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://api.open-meteo.com/v1/",
  },
};
