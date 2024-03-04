const { defineConfig } = require("cypress");
const fs = require("fs-extra");
const path = require("path");

function searchConfigFile(file) {
  const pathFile = path.resolve(".", "cypress", "config", `${file}.json`);
  return fs.readJson(pathFile);
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "hml";
      config = searchConfigFile(file);
      return config;
    },
    env: {
      hideXhr: true,
    },
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    notifications: 'allow',
    geolocation: 'allow',
  },
});
