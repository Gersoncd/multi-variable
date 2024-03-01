const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const path = require('path')

function searchConfigFile(file) {
  const pathFile = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(pathFile)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'prod'
      config = searchConfigFile(file)
      return config
    },
  },
})
