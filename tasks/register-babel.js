const path = require('path')

require('@babel/register')({
  configFile:
    path.resolve(__dirname, './babel.for-tasks.config.js'),
})
