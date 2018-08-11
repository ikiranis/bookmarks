<template>
    <div>
        <div class="card">
            <img v-if="bookmark.image" class="card-img-top" :src="bookmark.image" alt="Bookmark image">

            <div class="card-header">
                <router-link :to="{ name: 'bookmark', params: { id: bookmark.id } }" :key="$route.fullPath"><strong>{{
                    bookmark.title }}</strong></router-link>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="bookmark.description"></p>

                <a :href="bookmark.url">{{ bookmark.url }}</a>
            </div>

            <div class="card-footer text-center">
                <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark()">Edit</span>
                <span class="btn btn-sm btn-danger mx-1"
                      v-on:click="removeBookmark()">Remove</span>
            </div>
        </div>

        <edit-bookmark :parentBookmark="bookmark" v-if="isEditBookmarkOn"/>
    </div>

</template>

<script>

    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import {mapState, mapMutations} from 'vuex';

    export default {

        components: {EditBookmark},

        props: {
            parentBookmark: Object
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn']),

            bookmark: function () {
                return this.parentBookmark
            }
        },

        watch: {
            // Refresh Bookmarks if isEditBookmarkOn changed
            isEditBookmarkOn: function () {
                this.getBookmark()
            }
        },

        created: function () {
            this.setIsEditBookmarkOn(false);
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             *
             */
            getBookmark() {
                api.getBookmark(this.bookmark.id)
                    .then(response => {
                        this.bookmark = response;
                    })
                    .catch(error => console.log(error.response));
            },

            /**
             * Remove bookmark with this.bookmark.id
             */
            removeBookmark() {
                api.removeBookmark(this.bookmark.id)
                    .then(response => {
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
            }
        }

    }

</script>