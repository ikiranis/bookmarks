<template>
    <div>

        <!-- TODO make modal bigger -->
        <b-modal ref="editBookmarkModal" size="lg" centered hide-footer title="Edit Bookmark">
            <edit-bookmark :bookmark="bookmark" v-if="isEditBookmarkOn"/>
        </b-modal>

        <div class="card mx-1">
            <img v-if="bookmark.image" class="col-lg-8 col-12 ml-auto mr-auto" :src="bookmark.image"
                 alt="Bookmark image">

            <div class="card-header">
                <div>
                    <router-link v-if="bookmarksList" :to="{ name: 'bookmark', params: { id: bookmark.id } }"
                                 :key="$route.fullPath">
                        <h3>{{ bookmark.title }}</h3>
                    </router-link>
                    <h3 v-else>{{ bookmark.title }}</h3>
                </div>
                <div class="text-right" v-if="bookmark.created_at">
                    <small>Created at
                        <span :title="moment(String(bookmark.created_at.date)).format('DD/MM/YYYY HH:mm')">
							{{ moment(String(bookmark.created_at.date)).format('DD/MM/YYYY') }}
						</span>
                        by {{ bookmark.owner }}
                    </small>
                </div>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="compiledMarkdown"></p>

                <ul class="list-items">
                    <li class="list-item" v-for="file in bookmark.files" :key="file.id">
                        {{ file.fullPathName }}
                    </li>
                </ul>

                <a :href="bookmark.url" v-if="bookmark.url" target="new">{{ urlParser.hostname }}</a>

                <div class="mt-2 text-center">
                    <router-link :key="tag.id" v-for="tag in bookmark.tags"
                                 :to="{ name: 'tagSearch', params: { id: tag.id } }">
                        <span class="btn btn-sm mx-2 mt-1 btn-secondary text-light">{{ tag.name }}</span>
                    </router-link>
                </div>
            </div>

            <div class="text-right px-3" v-if="bookmark.group_name">
                <router-link :to="{ name: 'groupSearch', params: { id: bookmark.group_id } }" :key="bookmark.group_id">
                    {{ bookmark.group_name }}
                </router-link>
            </div>

            <div class="card-footer text-center" v-if="!bookmarksList && bookmark.user_id === userId">
                <button class="btn btn-sm btn-info mx-1" v-on:click="editBookmark()" data-toggle="modal"
                      data-target="#editBookmarkModal">Edit</button>
                <button class="btn btn-sm btn-danger mx-1"
                      v-on:click="removeBookmark()">Remove</button>
                <button class="btn btn-sm mx-1" :class="bookmarkPublic ? 'btn-success' : 'btn-warning'"
                      v-on:click="toggleBookmarkPublic()">{{ bookmarkPublic ? 'Make private' : 'Make public'}}</button>
            </div>

        </div>
    </div>
</template>

<script>

    import api from '@/api';
    import EditBookmark from './EditBookmark';
    import {mapState, mapMutations} from 'vuex';
    import moment from 'moment';
    import utility from "@/library/utilities";
    import * as marked from 'marked';

    export default {

        components: {EditBookmark},

        data: function() {
            return {
                bookmarkPublic: false
            }
        },

        props: {
            bookmark: Object,
            bookmarksList: Boolean
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn']),

            urlParser: function () {
                return utility.parse_url(this.bookmark.url);
            },

            compiledMarkdown: function () {
                if (this.bookmark.description) {
                    let description = this.bookmark.description.markdown ? this.bookmark.description.markdown : this.bookmark.description;

                    return marked(description, {sanitize: true});
                }
            }

        },

        created: function () {
            this.setIsEditBookmarkOn(false);
            this.bookmarkPublic = this.bookmark.public;
        },

        watch: {
            isEditBookmarkOn(value) {
                if (!value) {
                    this.$refs.editBookmarkModal.hide();
                }
            },

            bookmark() {
                this.bookmarkPublic = this.bookmark.public;
            }
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            moment,

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
             * Display edit bookmark window
             */
            editBookmark() {
                this.$refs.editBookmarkModal.show();
                this.setIsEditBookmarkOn(true);
            },

            toggleBookmarkPublic() {
                api.toggleBookmarkPublic(this.bookmark.id)
                    .then((response) => {
                        this.bookmarkPublic = response.public;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }

    }

</script>

<style scoped>


    /* unvisited link */
    a:link {
        color: black;
        text-decoration: underline;
    }

    /* visited link */
    a:visited {
        color: black;
    }

    /* mouse over link */
    a:hover {
        color: black;
    }

    /* selected link */
    a:active {
        color: black;
    }

    p >>> pre {
        background: #f4f4f4;
        border: 1px solid #ddd;
        border-left: 3px solid #f36d33;
        color: #666;
        page-break-inside: avoid;
        font-family: monospace, "Courier New", Courier;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 1.6em;
        max-width: 100%;
        overflow: auto;
        padding: 1em 1.5em;
        display: block;
        word-wrap: break-word;
    }

</style>