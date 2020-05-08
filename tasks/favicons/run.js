require('../register-babel')
const { default: defaultTask } = require('./index')
if (defaultTask) {
  defaultTask()
}
