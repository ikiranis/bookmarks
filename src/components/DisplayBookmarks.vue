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

        <nav aria-label="Bookmarks navigation">
            <ul class="pagination">
                <li class="page-item"><span class="page-link" v-on:click="getAllBookmarks(pagination.links.prev)">Previous</span></li>
                <!--<li class="page-item"><a class="page-link" href="#">1</a></li>-->
                <li class="page-item"><span class="page-link" v-on:click="getAllBookmarks(pagination.links.next)">Next</span></li>
            </ul>
        </nav>

        <edit-bookmark :bookmarkId="bookmarkId" v-if="isEditBookmarkOn" />

    </div>
</template>

<script>
    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import utility from '@/library/utilities';
    import {mapState,mapMutations} from 'vuex';

    export default {

        components: {EditBookmark},

        data: () => ({
            bookmarks: [],
            pagination: {},
            bookmarkId: ''
        }),

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn'])
        },

        created: function () {
            this.getAllBookmarks(null);
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             * Get the list of bookmarks for user with userId
             */
            getAllBookmarks(page) {
                api.getAllBookmarks(this.userId, page)
                    .then(response => {
                        console.log(response.data)
                        this.bookmarks = response.data;
                        this.pagination.meta = response.meta;
                        this.pagination.links = response.links;
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
                this.setIsEditBookmarkOn(true);
            }

        }
    }
</script>