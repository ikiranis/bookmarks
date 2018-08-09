<template>
    <div class="displayBookmarks container">
        <h3 class="text-center">Bookmarks</h3>

        <div class="row">

            <div class="col-lg-6 col-12 mt-3" v-for="bookmark in bookmarks" :key="bookmark.id">
                <div class="card">
                    <img class="card-img-top" :src="bookmark.image" alt="Card image cap">

                    <div class="card-header">
                        {{ bookmark.title }}
                    </div>

                    <div class="card-body">
                        <p class="card-text" v-html="bookmark.description"></p>

                        <a :href="bookmark.url">{{ bookmark.url }}</a>
                    </div>

                    <div class="card-footer text-center">
                        <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark(bookmark.id)">Edit</span>
                        <span class="btn btn-sm btn-danger mx-1"
                              v-on:click="removeBookmark(bookmark.id)">Remove</span>
                    </div>
                </div>
            </div>

        </div>


        <nav v-if="pagination.links" aria-label="Bookmarks navigation" class="row mt-3">
            <ul class="pagination ml-auto mr-auto">
                <li class="page-item" :class="pagination.links.prev ? '' : 'disabled'">
                    <span class="page-link" v-on:click="getBookmarks(pagination.links.prev)">Previous</span>
                </li>
                <li class="page-item disabled">
                    <span class="page-link">Page {{ pagination.meta.current_page }} of {{ pagination.meta.last_page }}</span>
                </li>
                <li class="page-item" :class="pagination.links.next ? '' : 'disabled' ">
                    <span class="page-link" v-on:click="getBookmarks(pagination.links.next)">Next</span>
                </li>
            </ul>
        </nav>

        <edit-bookmark :bookmarkId="bookmarkId" v-if="isEditBookmarkOn"/>

    </div>
</template>

<script>
    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import utility from '@/library/utilities';
    import {mapState, mapMutations} from 'vuex';

    export default {

        components: {EditBookmark},

        data: () => ({
            bookmarks: [],
            pagination: {
                meta: null,
                links: null
            },
            bookmarkId: ''
        }),

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn'])
        },

        created: function () {
            this.setIsEditBookmarkOn(false);
            this.getBookmarks(null);
        },

        watch: {
            // Refresh Bookmarks if isEditBookmarkOn changed
            isEditBookmarkOn: function (changedValue) {
                if (!changedValue) {
                    this.getBookmarks(this.pagination.meta.path + '?page=' + this.pagination.meta.current_page);
                }
            }
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             * Get the list of bookmarks for user with userId
             */
            getBookmarks(page) {
                api.getBookmarks(this.userId, page)
                    .then(response => {
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
