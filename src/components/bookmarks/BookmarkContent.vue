<template>
    <div>
        <div class="card">
            <img v-if="bookmark.image" class="card-img-top" :src="bookmark.image" alt="Bookmark image">

            <div class="card-header">
                <div>
                    <router-link v-if="bookmarksList" :to="{ name: 'bookmark', params: { id: bookmark.id } }"
                                 :key="$route.fullPath">
                        <strong>{{ bookmark.title }}</strong>
                    </router-link>
                    <strong v-else>{{ bookmark.title }}</strong>
                </div>
                <div class="text-right" v-if="bookmark.created_at">
                    <small>{{ moment(String(bookmark.created_at.date)).format('DD/MM/YYYY HH:mm') }}</small>
                </div>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="bookmark.description"></p>

                <a :href="bookmark.url">{{ bookmark.url }}</a>

                <div class="row mt-2">
                    <span class="mx-2 px-2 bg-primary text-light" :key="tag.id" v-for="tag in bookmark.tags">{{ tag.name }}</span>
                </div>
            </div>

            <div class="text-right px-3" v-if="bookmark.group_name">
                <router-link :to="{ name: 'groupSearch', params: { id: bookmark.group_id } }" :key="$route.fullPath">
                    {{ bookmark.group_name }}
                </router-link>
            </div>


            <div class="card-footer text-center" v-if="!bookmarksList">
                <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark()">Edit</span>
                <span class="btn btn-sm btn-danger mx-1"
                      v-on:click="removeBookmark()">Remove</span>
            </div>
        </div>

        <edit-bookmark :bookmark="bookmark" v-if="isEditBookmarkOn"/>
    </div>

</template>

<script>

    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import {mapState, mapMutations} from 'vuex';
    import moment from 'moment';

    export default {

        components: {EditBookmark},

        props: {
            bookmark: Object,
            bookmarksList: Boolean
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn'])
        },

        created: function () {
            this.setIsEditBookmarkOn(false);
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             * Remove bookmark with this.bookmark.id
             */
            removeBookmark() {
                api.removeBookmark(this.bookmark.id)
                    .then(() => {
                        this.$router.push({path: '/'}); // Force to load home page
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            /**
             *
             */
            editBookmark() {
                this.setIsEditBookmarkOn(true);
            },

            moment
        }

    }

</script>