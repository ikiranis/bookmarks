import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Bookmark from './views/Bookmark.vue'

Vue.use(Router);

export default new Router({
    mode: 'history', // removes # from url
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/bookmark',
            name: 'bookmark',
            component: Bookmark
        }
    ]
})
