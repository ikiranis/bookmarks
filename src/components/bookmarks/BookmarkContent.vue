<template>
    <div>

        <b-modal ref="attachmentModal" size="lg" centered hide-footer :title="image.filename">
            <div v-if="image.src"><img :src="image.src" width="100%"></div>
        </b-modal>

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

                <ul class="list-group">
                    <li class="list-group-item" v-for="file in bookmark.files" :key="file.id">
                        <div class="row">
                            <span class="col-7">{{ file.filename }}</span>
                            <span class="col-5 text-right">
                                <span v-if="checkFileExtension(file.filename)">
                                    <eye-icon @click.native="getFile(file.id)" class="btn-icon" title="View image" />
                                </span>
                                <span v-else>
                                    <download-icon @click.native="getFile(file.id)" class="btn-icon" title="Download file" />
                                </span>

                                <span class="col-4 text-right" v-if="!bookmarksList && bookmark.user_id === userId">
                                    <delete-icon @click.native="deleteFile(file.id)" class="btn-icon" title="Delete File" />
                                </span>
                            </span>
                        </div>
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
                <pencil-icon class="btn-icon" @click.native="editBookmark()" title="Edit bookmark" />
                <delete-icon class="btn-icon" @click.native="removeBookmark()" title="Delete bookmark" />

                <earth-icon v-if="bookmarkPublic" class="btn-icon" @click.native="toggleBookmarkPublic()" title="Make private" />
                <file-hidden-icon v-else class="btn-icon" @click.native="toggleBookmarkPublic()" title="Make public" />
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
    import { base64StringToBlob } from 'blob-util'
    import EarthIcon from "vue-material-design-icons/Earth";

    export default {

        components: {EarthIcon, EditBookmark},

        data: function () {
            return {
                bookmarkPublic: false,
                image: {
                    src: null,
                    filename: null
                }
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
            },

            rootApi: function () {
                return api.rootApi() + '/serveFile/';
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

            /**
             * Toggle public flag true/false
             */
            toggleBookmarkPublic() {
                api.toggleBookmarkPublic(this.bookmark.id)
                    .then((response) => {
                        this.bookmarkPublic = response.public;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            /**
             * Get the file and display images or download other files
             *
             * @param id
             */
            getFile(id) {
                api.getFile(id)
                    .then(response => {
                        if (response.headers["content-type"].includes('image')) {
                            this.image = {
                                src: 'data: ${response.headers["content-type"]};base64,' + response.data.content,
                                filename: response.data.filename
                            };
                            this.$refs.attachmentModal.show();
                        } else {
                            const url = window.URL.createObjectURL(new Blob([
                                base64StringToBlob(response.data.content, response.headers["content-type"])
                            ]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', response.data.filename);
                            document.body.appendChild(link);
                            link.click();
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    })
            },


            /**
             * Delete file with id from database and storage
             * @param id
             */
            deleteFile(id) {
                api.deleteFile(id)
                    .then(response => {
                        this.bookmark.files = utility.removeObjFromArray(this.bookmark.files, 'id', response.data.id);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    })
            },

            /**
             * Check if file is image
             *
             * @param file
             * @returns {boolean}
             */
            checkFileExtension(file) {
                let imageExtensions = ['jpeg', 'jpg', 'tif', 'png', 'gif'];
                let fileExtension = file.substr(file.lastIndexOf('.') + 1);

                return imageExtensions.includes(fileExtension); // Return true if file is image
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