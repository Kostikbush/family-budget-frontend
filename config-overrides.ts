const autoprefixer = require("autoprefixer");
const rewirePostcss = require("react-app-rewire-postcss");

module.exports = function override(config, env) {
  config = rewirePostcss(config, {
    plugins: () => [autoprefixer],
  });

  return config;
};
