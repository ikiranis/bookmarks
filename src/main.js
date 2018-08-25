import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// wysiwyg editor
// @source https://github.com/chmln/vue-wysiwyg
// import wysiwyg from "vue-wysiwyg";
// Vue.use(wysiwyg, {
//     forcePlainTextOnPaste: true,
//     maxHeight: "500px"
// }); // config is optional
// import "vue-wysiwyg/dist/vueWysiwyg.css"; // stylesheet

// markdown editor
import VueEditorMarkdown from 'vue-editor-markdown';
Vue.use(VueEditorMarkdown);

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

// TODO user screen. Change password, name. Delete account
// TODO encrypt a bookmark
// TODO attachments upload
// TODO evernote, browser bookmarks import
// TODO Forgot my password
// TODO hide groups/tags
// TODO refresh groups/tags on inserting new in a post
