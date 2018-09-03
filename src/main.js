import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = true; // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// markdown editor
// @link https://www.npmjs.com/package/vue-editor-markdown
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

// Material Design icons
// @link https://materialdesignicons.com/
import DeleteIcon from "vue-material-design-icons/Delete.vue";
Vue.component("delete-icon", DeleteIcon);
import EyeIcon from "vue-material-design-icons/Eye.vue";
Vue.component("eye-icon", EyeIcon);
import DownloadIcon from "vue-material-design-icons/Download.vue";
Vue.component("download-icon", DownloadIcon);
import PencilIcon from "vue-material-design-icons/Pencil.vue";
Vue.component("pencil-icon", PencilIcon);
import FileHiddenIcon from "vue-material-design-icons/FileHidden.vue";
Vue.component("file-hidden-icon", FileHiddenIcon);
import ExitIcon from "vue-material-design-icons/ExitRun.vue";
Vue.component("exit-icon", ExitIcon);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


