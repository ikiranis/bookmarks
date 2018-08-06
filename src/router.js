import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Bookmark from './views/Bookmark.vue'
import Groups from './views/Groups.vue'
import Group from './views/Group.vue'

Vue.use(Router);

export default new Router({
    mode: 'history', // removes # from url
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Home Page - Bookmarks',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The home page of our example app.'
                    },
                    {
                        property: 'og:description',
                        content: 'The home page of our example app.'
                    }
                ]
            }
        },
        {
            path: '/bookmark',
            name: 'bookmark',
            component: Bookmark,
            meta: {
                title: 'Insert Bookmark - Bookmarks'
            }
        },
        {
            path: '/groups',
            name: 'groups',
            component: Groups,
            meta: {
                title: 'Manage Groups - Bookmarks'
            }
        },
        {
            path: '/group/:id',
            name: 'group',
            component: Group,
            meta: {
                title: 'Manage Group - Bookmarks'
            }
        }
    ]
})

