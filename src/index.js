import VueAwesomeGrid from './lib/main.vue';

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  
  Vue.component('vue-awesome-grid', VueAwesomeGrid);
}

const plugin = {
  install
};

// Default export is library as a whole, registered via Vue.use()
export default plugin;

export {
  VueAwesomeGrid
};