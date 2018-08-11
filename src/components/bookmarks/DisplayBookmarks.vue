<template>
    <div class="displayBookmarks container">
        <h3 class="text-center">Bookmarks</h3>

        <div class="row">

            <div class="col-lg-6 col-12 mt-3" v-for="bookmark in bookmarks" :key="bookmark.id">
                <BookmarkContent :bookmark="bookmark" />
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



    </div>
</template>

<script>
    import api from '@/api';
    import BookmarkContent from "./BookmarkContent";
    import {mapState} from 'vuex';

    export default {

        components: {BookmarkContent},

        data: () => ({
            bookmarks: [],
            pagination: {
                meta: null,
                links: null
            },
        }),

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            this.getBookmarks(null);
        },

        methods: {

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
            }

        }
    }
</script>
