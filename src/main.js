import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// wysiwyg editor
// @source https://github.com/chmln/vue-wysiwyg
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
    forcePlainTextOnPaste: true
}); // config is optional
import "vue-wysiwyg/dist/vueWysiwyg.css"; // stylesheet

// User Authentication
import user from '@/library/user'
user.setUserTokenHeader();

// Set routes titles
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next()
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');



// TODO forms validation
// TODO check if api works and display errors when api fails