import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if(typeof localStorage.accessToken !== 'undefined') {
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = localStorage.tokenType + " " + localStorage.accessToken;
}

// let token = document.head.querySelector('meta[name="csrf-token"]');
//k
// if (token) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
