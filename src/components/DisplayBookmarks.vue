<template>
    <div class="displayBookmarks container">
        <h3>List of bookmarks</h3>

        <ul v-for="bookmark in bookmarks" :key="bookmark.id" class="list-group">
            <li class="list-group-item">
                <a :href="bookmark.url">{{ bookmark.description }} - {{ bookmark.url }}</a>
                <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark(bookmark.id)">Edit</span>
                <span class="btn btn-sm btn-danger mx-1" v-on:click="removeBookmark(bookmark.id)">Remove</span>
            </li>
        </ul>

        <edit-bookmark :bookmarkId="bookmarkId" v-if="editBookmarkOn"/>

    </div>
</template>

<script>
    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import utility from '@/library/utilities';
    import {mapState} from 'vuex';

    export default {

        components: {EditBookmark},

        data: () => ({
            bookmarks: [],
            editBookmarkOn: false,
            bookmarkId: ''
        }),

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            this.getAllBookmarks();
        },

        methods: {

            /**
             * Get the list of bookmarks for user with userId
             */
            getAllBookmarks() {
                api.getAllBookmarks(this.userId)
                    .then(response => {
                        this.bookmarks = response;
                    })
                    .catch(error => console.log(error.response));
            },

            /**
             * Remove bookmark with bookmarkId
             *
             * @param bookmarkId
             */
            removeBookmark(bookmarkId) {
                api.removeBookmark(bookmarkId)
                    .then(response => {
                        this.bookmarks = utility.removeObjFromArray(this.bookmarks, 'id', response.data.id);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            editBookmark(bookmarkId) {
                this.bookmarkId = bookmarkId;
                this.editBookmarkOn = true;
            }

        }
    }
</script>