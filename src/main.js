import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

import user from '@/library/user'

user.setUserTokenHeader();

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// TODO forms validation
// TODO check if api works and display errors when api fails
// TODO paging at bookmarks list