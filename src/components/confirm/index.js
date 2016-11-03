import Confirm from './confirm.js';
const install = function (Vue) {
  if(install.installed) return;
  Vue.$confirm = Vue.prototype.$confirm = Confirm;
}
module.exports = Confirm;
