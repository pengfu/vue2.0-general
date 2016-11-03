import Vue from 'vue';

const ConfirmConstructor = Vue.extend(require('./confirm.vue'));
let confirmPool = [];

let getAnInstance = () => {
  if (confirmPool.length > 0) {
    let instance = confirmPool[0];
    confirmPool.splice(0, 1);
    return instance;
  }
  return new ConfirmConstructor({
    el: document.createElement('div')
  });
};

let returnAnInstance = instance => {
  if (instance) {
    confirmPool.push(instance);
  }
};

// let removeDom = event => {
//   if (event.target.parentNode) {
//     event.target.parentNode.removeChild(event.target);
//   }
// };

ConfirmConstructor.prototype.close = function() {
  this.show = false;
  // this.$el.addEventListener('transitionend', removeDom);
  returnAnInstance(this);
};

let extend = (destination, source) => {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
      source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

let Confirm = (options = {}) => {

  let instance = getAnInstance();
  instance.message =  options.message;
  instance.confirm = options.confirm;
  instance.cancel = options.cancel;

  document.body.appendChild(instance.$el);
  Vue.nextTick(function() {
    instance.show = true;
    // instance.$el.removeEventListener('transitionend', removeDom);

  });
  return instance;
};

export default Confirm;
