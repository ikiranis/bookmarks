import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import InsertBookmark from './views/InsertBookmark.vue';
import Groups from './views/Groups.vue';
import Group from './views/Group.vue';
import User from './views/User.vue';
import Bookmark from './views/Bookmark.vue';

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
            path: '/group/:id',
            name: 'groupSearch',
            component: Home,
            meta: {
                title: 'Group - Bookmarks'
            }
        },
        {
            path: '/tag/:id',
            name: 'tagSearch',
            component: Home,
            meta: {
                title: 'Tag - Bookmarks'
            }
        },
        {
            path: '/insertBookmark',
            name: 'insertBookmark',
            component: InsertBookmark,
            meta: {
                title: 'Insert Bookmark - Bookmarks'
            }
        },
        {
            path: '/bookmark/:id',
            name: 'bookmark',
            component: Bookmark,
            meta: {
                title: 'Bookmark - Bookmarks'
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
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            meta: {
                title: 'Manage User - Bookmarks'
            }
        }
    ]
})

