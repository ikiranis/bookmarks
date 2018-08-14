<template>
    <div class="displayBookmarks container">

        <div class="row">
            <div class="input-group col-lg-3 col-12 ml-auto mr-auto">
                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control" id="search" name="search"
                       v-model="search">

                <span class="btn btn-info mx-1" v-on:click="searchText()">Search</span>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-12 mt-3" v-for="bookmark in bookmarks" :key="bookmark.id">
                <BookmarkContent :bookmark="bookmark" :bookmarksList="true"/>
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
            search: ''
        }),

        props: {
            groupId: String
        },

        watch: {
            groupId() {
                this.getBookmarks(null);
            }
        },

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
                let args = {
                    user_id: this.userId,
                    group_id: this.groupId,
                    search: this.search
                };

                api.getBookmarks(args, page)
                    .then(response => {
                        this.bookmarks = response.data;
                        this.pagination.meta = response.meta;
                        this.pagination.links = response.links;
                    })
                    .catch(error => console.log(error.response));
            },

            searchText() {
                this.getBookmarks(null);
            }

        }
    }
</script>
