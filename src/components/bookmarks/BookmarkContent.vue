<template>
    <div>

        <b-modal ref="attachmentModal" size="lg" centered hide-footer :title="image.filename">
            <div v-if="image.src"><img :src="image.src" width="100%"></div>
        </b-modal>

        <b-modal ref="editBookmarkModal" size="lg" centered hide-footer title="Edit Bookmark">
            <edit-bookmark :bookmark="bookmark" v-if="isEditBookmarkOn"/>
        </b-modal>

        <div v-if="!compact" class="card mx-1 mb-3">
            <img v-if="mainImage" class="col-lg-8 col-12 mx-auto" :src="mainImage"
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
                <div v-if="bookmark.password === null" class="card-text" v-html="compiledMarkdown"></div>
                <div v-else>
                    <div class="blur text-truncate" v-html="randomLines"></div>

                    <loading :loading="loadDecrypt" />

                    <div class="input-group mt-3 col-xl-8 col-12 mx-auto">
                        <div class="input-group-prepend">
                            <label for="Password" class="input-group-text mt-1 bg-danger text-light">Password</label>
                        </div>
                        <input type="password" class="form-control form-control-sm mt-1" id="password" name="password"
                               v-model="password" data-lpignore="true" readonly onfocus="this.removeAttribute('readonly');">

                        <button class="btn btn-warning col-md-4 col-12 mt-1 mx-md-1" v-on:click="decryptDescription()">Decrypt text</button>
                    </div>

                </div>

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

                <display-error v-if="response.message" :response="response" />
            </div>

            <div class="text-right px-3" v-if="bookmark.group_name">
                <router-link :to="{ name: 'groupSearch', params: { id: bookmark.group_id } }" :key="bookmark.group_id">
                    {{ bookmark.group_name }}
                </router-link>
            </div>

            <div class="card-footer text-center" v-if="!bookmarksList && bookmark.user_id === userId">
                <pencil-icon class="btn-icon" @click.native="editBookmark" title="Edit bookmark" />
                <delete-icon class="btn-icon" @click.native="removeBookmark" title="Delete bookmark" />

                <earth-icon v-if="bookmarkPublic" class="btn-icon" @click.native="toggleBookmarkPublic" title="Make private" />
                <file-hidden-icon v-else class="btn-icon" @click.native="toggleBookmarkPublic" title="Make public" />
            </div>

        </div>

        <div v-else class="card">
            <div class="card-body">
                <router-link  :to="{ name: 'bookmark', params: { id: bookmark.id } }"
                             :key="$route.fullPath">
                    <h3>{{ bookmark.title }}</h3>
                </router-link>

                <div class="text-right" v-if="bookmark.created_at">
                    <small>Created at
                        <span :title="moment(String(bookmark.created_at.date)).format('DD/MM/YYYY HH:mm')">
							{{ moment(String(bookmark.created_at.date)).format('DD/MM/YYYY') }}
						</span>
                        by {{ bookmark.owner }}
                    </small>
                </div>
            </div>
        </div>

        <loading :loading="loading" />

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
    import DisplayError from "@/components/basic/DisplayError";
    import Loading from "../basic/Loading";

    export default {

        components: {Loading, EarthIcon, EditBookmark, DisplayError},

        data: function () {
            return {
                response: {
                    message: '',
                    status: '',
                    errors: []
                },
                bookmarkPublic: false,
                image: {
                    src: null,
                    filename: null
                },
                mainImage: null,
                password: null,
                loadDecrypt: false
            }
        },

        props: {
            bookmark: Object,
            bookmarksList: Boolean,
            compact: Boolean
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn', 'loading']),

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
            },

            randomLines: function() {
                let lines = '';

                for(let i=0; i <  Math.floor((Math.random() * 5) + 3); i++) {
                    let line = '';
                    for(let j=0; j < Math.floor((Math.random() * 60) + 30); j++) {
                        line += '#';
                    }
                    lines += `<p>${line}</p>`;
                }

                return lines;
            }

        },

        created: function () {
            this.findImage();
            this.setIsEditBookmarkOn(false);
            this.bookmarkPublic = this.bookmark.public;

            if(this.bookmarksList) {
                this.truncateDescription();
            }
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

            ...mapMutations(['setIsEditBookmarkOn', 'setLoading']),

            moment,

            /**
             * Remove bookmark with this.bookmark.id
             */
            removeBookmark() {
                let choise = confirm('Are you sure you want to delete the bookmark?');

                if(choise) {
                    this.setLoading(true);

                    api.removeBookmark(this.bookmark.id)
                        .then(() => {
                            this.$router.push({path: '/'}); // Force to load home page

                            this.setLoading(false);
                        })
                        .catch(error => {
                            this.response.message = error.response.data.message;
                            this.response.status = false;

                            this.setLoading(false);
                        });
                }
            },

            /**
             * Display edit bookmark window
             */
            editBookmark() {
                if(this.bookmark.password === null) {
                    this.$refs.editBookmarkModal.show();
                    this.setIsEditBookmarkOn(true);
                } else {
                    this.response.message = 'You must decrypt the text to edit this bookmark';
                    this.response.status = false;
                }
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
                        if (response.headers["content-type"].includes('image')) { // If file is image
                            this.image = {
                                src: 'data: ${response.headers["content-type"]};base64,' + response.data.content,
                                filename: response.data.filename
                            };
                            this.$refs.attachmentModal.show();
                        } else { // If file is not image
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
             * Find if there is bookmark image, else search images in attachments and take the first to display
             */
            findImage() {
                // Check if bookmark have image
                if(this.bookmark.image) {
                    this.mainImage =  this.bookmark.image;
                }

                // Search in attachments for image
                if(this.bookmark.files) {
                    for (let i=0; i<this.bookmark.files.length; i++) {
                        if(this.checkFileExtension(this.bookmark.files[i].filename)) {
                            this.getImage(this.bookmark.files[i].id);
                            return;
                        }
                    }
                }
            },

            /**
             * Get the image and set the this.mainImage to display
             */
            getImage(id) {
                api.getFile(id)
                    .then(response => {
                        if (response.headers["content-type"].includes('image')) {
                            this.mainImage = 'data: ${response.headers["content-type"]};base64,' + response.data.content;
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    })
            },


            /**
             * Delete file with id from database and storage
             *
             * @param id
             */
            deleteFile(id) {
                let choise = confirm('Are you sure you want to delete the file?');

                if(choise) {
                    this.setLoading(true);

                    api.deleteFile(id)
                        .then(response => {
                            this.bookmark.files = utility.removeObjFromArray(this.bookmark.files, 'id', response.data.id);

                            this.setLoading(false);
                        })
                        .catch(error => {
                            // TODO remove from bookmarks.files too, when deleted from database but returns error
                            this.response.message = error.response.data.message;
                            this.response.status = false;

                            this.setLoading(false);
                        })
                }
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
            },

            /**
             * Get decrypted description
             *
             * @returns {Promise<void>}
             */
            async decryptDescription() {
                let args = {
                    id: this.bookmark.id,
                    password: this.password
                };

                this.loadDecrypt = true;

                this.response = {
                    message: '',
                    status: '',
                    errors: []
                };

                try {
                    let response = await api.decryptDescription(args);

                    this.bookmark.description = response.description;
                    this.bookmark.password = null;

                    this.loadDecrypt = false;
                } catch(error) {
                    this.response.message = error.response.data.message;
                    this.response.status = false;

                    this.loadDecrypt = false;
                }
            },

            truncateDescription() {
                // TODO make it dynamic with parameters
                // TODO display link for more
                let text = this.bookmark.description;

                this.bookmark.description = text.slice(0, 1000) + ((text.length > 1000) ? ' ...' : '');
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

    div >>> pre {
        background: #f4f4f4;
        border: 1px solid #ddd;
        border-left: 3px solid #f36d33;
        color: #666;
        page-break-inside: avoid;
        font-family: monospace, "Courier New", Courier;
        font-size: 0.8em;
        line-height: 1.6;
        margin-bottom: 1.6em;
        max-width: 100%;
        overflow: auto;
        padding: 1em 1.5em;
        display: block;
        word-wrap: break-word;
    }

    .blur {
        text-shadow: 0 0 1em black;
        color: transparent;
    }

    input[readonly] {
        cursor: text;
        background-color: #fff;
    }

</style>