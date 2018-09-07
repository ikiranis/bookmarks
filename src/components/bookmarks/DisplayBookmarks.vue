<template>
    <div>

        <div class="row">

            <list-icon v-if="!compact" class="btn ml-auto" @click.native="compact = !compact" title="List layout" />
            <cards-icon v-else class="btn ml-auto" @click.native="compact = !compact" title="Cards Layout" />

            <form @submit.prevent="searchText" class="row col-lg-6 col-12 ml-auto mr-auto">

                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                       id="search" name="search" v-model="search">

                <input type="submit" class="btn btn-success col-md-3 col-12 my-1 ml-auto mr-auto" value="Search">
                <button class="btn btn-danger col-md-3 col-12 my-1" @click="clearSearch()">Clear Search</button>
            </form>

        </div>

        <display-error v-if="response.message" :response="response"/>

        <div class="row">

            <div class="col-lg-2 col-12">
                <GroupsList :groups="groups" v-if="groups.length > 0"/>

                <TagsList :tags="tags" v-if="tags.length > 0"/>
            </div>

            <div class="row col-lg-10 col-12 no-gutters">
                <div class="col-12 mt-3" :class="!compact ? 'col-lg-6' : ''" v-for="bookmark in bookmarks"
                     :key="bookmark.id">
                    <BookmarkContent :bookmark="bookmark" :bookmarksList="true" :compact="compact"/>
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
    </div>
</template>

<script>
    import api from '@/api';
    import BookmarkContent from "./BookmarkContent";
    import {mapState} from 'vuex';
    import GroupsList from "../groups/GroupsList";
    import TagsList from "../groups/TagsList";
    import DisplayError from "@/components/basic/DisplayError";

    export default {

        components: {TagsList, GroupsList, BookmarkContent, DisplayError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            bookmarks: [],
            pagination: {
                meta: null,
                links: null
            },
            search: '',
            compact: false
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
            ...mapState(['userId', 'groups', 'tags'])
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

                this.response = {
                    message: '',
                    status: '',
                    errors: []
                };

                api.getBookmarks(args, page)
                    .then(response => {
                        // console.log(response)
                        this.bookmarks = response.data;
                        this.pagination.meta = response.meta;
                        this.pagination.links = response.links;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
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
