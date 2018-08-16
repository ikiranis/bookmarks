<template>
    <div>
        <div class="row">
            <div class="input-group col-lg-6 col-12 ml-auto mr-auto">
                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control" id="search" name="search"
                       v-model="search">

                <span class="btn btn-success mx-1" v-on:click="searchText()">Search</span>
                <span class="btn btn-danger mx-1" v-on:click="clearSearch()">Clear Search</span>
            </div>
        </div>

        <div class="card-columns mt-3">
            <div v-for="bookmark in bookmarks" :key="bookmark.id">
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
            searchId: String,
            routeName: String
        },

        watch: {
            searchId() {
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
                    group_id: this.routeName === 'groupSearch' ? this.searchId : '',
                    search: this.search,
                    tag_id: this.routeName === 'tagSearch' ? this.searchId : ''
                };

                api.getBookmarks(args, page)
                    .then(response => {
                        // console.log(response)
                        this.bookmarks = response.data;
                        this.pagination.meta = response.meta;
                        this.pagination.links = response.links;
                    })
                    .catch(error => console.log(error.response));
            },

            searchText() {
                this.getBookmarks(null);
            },

            clearSearch() {
                this.search = '';
                this.getBookmarks(null);
            }

        }
    }
</script>

<style scoped lang="scss">

    @media (max-width: 991px) {
        .card-columns {
            column-count: 1;
        }
    }

    @media (min-width: 992px) {
        .card-columns {
            column-count: 2;
        }
    }


</style>