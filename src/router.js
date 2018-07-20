import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Bookmarks from './views/Bookmarks.vue'
import Bookmark from './views/Bookmark.vue'
import Login from './components/Login.vue'

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
            path: '/bookmarks',
            name: 'bookmarks',
            component: Bookmarks
        },
        {
            path: '/bookmark',
            name: 'bookmark',
            component: Bookmark
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },

    ]
})
