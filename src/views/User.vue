<template>
    <div class="my-3 mx-3" v-if="userToken">

        <div class="card">
            <div class="card-header">
                <strong>{{ userInfo.name }}</strong>
            </div>

            <div class="card-body">

                <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                    <div class="col-md-6">
                        <input id="email" type="email" class="form-control" v-model="userInfo.email"
                               required data-lpignore="true" readonly onfocus="this.removeAttribute('readonly');">
                        <form-error v-if="response.errors.email" :error="response.errors.email[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                    <div class="col-md-6">
                        <input id="password" type="password" class="form-control"
                               v-model="userInfo.password" data-lpignore="true"
                               readonly onfocus="this.removeAttribute('readonly');">
                        <form-error v-if="response.errors.password" :error="response.errors.password[0]"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm
                        Password</label>
                    <div class="col-md-6">
                        <input id="password-confirm" type="password" class="form-control"
                               v-model="password_confirmation" data-lpignore="true" autocomplete="off">
                    </div>
                </div>

                <div class="form-group mb-3">
                    <div class="col-md-8 mx-auto">
                        <button type="submit" class="btn btn-info btn-block" @click.prevent="updateUser">
                            Update user
                        </button>
                    </div>
                </div>

                <display-error v-if="response.message" :response="response"/>

                <div class="bg-dark text-light p-3">
                    <div>
                        <div>Api url for <a href="https://www.addtoany.com/" target="new">addToAny Plugin</a></div>
                        <code>{{ apiUrl }}&url=<strong>${link}</strong></code>
                        <div>Or for <a href="https://play.google.com/store/apps/details?id=net.daverix.urlforward"
                                       target="new">Url Forwarder for Android</a></div>
                        <code>{{ apiUrl }}&url=<strong>@url</strong></code>
                    </div>

                    <div class="col-md-8 mx-auto mt-3">
                        <span class="btn btn-light btn-block" @click="generateApiKey()">Create Api Key</span>
                    </div>
                </div>

                <div class="bg-warning text-light p-3 mt-3">
                    <div>Upload xml file to import bookmarks and notes</div>
                    <div class="custom-file col-12 px-1 mt-3">
                        <label class="custom-file-label" for="file">Choose file</label>
                        <input type="file" class="custom-file-input" name="file" id="file"
                               accept=".enex" @change="uploadFile">
                    </div>
                </div>

                <div class="mt-3" v-if="progress > 0">
                    <b-progress height="2rem" :value="parseInt(progress)" :max="progressMax" show-progress animated
                                variant="success"></b-progress>
                </div>

                <ul class="list-group mt-3">
                    <li class="list-group-item bg-success my-1" v-for="file in files" :key="file.name">
                        <div class="row">
                            <span class="col-8 text-white">{{ file.name }}</span>
                            <span class="col-4 text-right">
                                <button class="btn btn-sm btn-danger" @click="importDataFromXML(file)">Import Data</button>
                            </span>
                        </div>
                    </li>
                </ul>

                <div v-if="rejectedFiles.length > 0" class="mt-3">
                    <div class="alert alert-warning w-100 text-center">Rejected files for size limit or file error</div>
                    <ul class="list-group mt-2">
                        <li class="list-group-item bg-danger text-white my-1" v-for="file in rejectedFiles"
                            :key="file.id">
                            <span v-if="file.size">File Limit: ({{ file.size.toLocaleString() }} bytes) </span>
                            <span v-else>Uploaded file error: </span>
                            <span>{{ file.name }}</span>
                        </li>
                    </ul>
                </div>

                <loading :loading="loading" />

            </div>

        </div>

    </div>

</template>

<script>

    import api from '@/api';
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "@/components/basic/DisplayError";
    import FormError from "@/components/basic/FormError";
    import Loading from "../components/basic/Loading";
    import uploadFiles from "../library/uploadFiles";

    export default {

        components: {Loading, DisplayError, FormError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            userInfo: {
                id: null,
                name: null,
                email: null,
                password: null,
                role_id: 2,
                api_key: null
            },
            password_confirmation: '',
            progressMax: 100
        }),

        computed: {

            ...mapState(['loading', 'files', 'progress', 'rejectedFiles']),

            apiUrl: function () {
                return process.env.VUE_APP_API_HOST
                    + process.env.VUE_APP_API_SUFFIX
                    + '/addBookmark?api_key='
                    + this.userInfo.api_key;
            },

            userToken: function () {
                return localStorage.accessToken ? localStorage.accessToken : null;
            }
        },

        created: function () {
            this.getCurrentUser();
        },

        methods: {

            ...mapMutations(['setLoading', 'setFiles']),

            /**
             * Get current user info
             */
            getCurrentUser() {
                this.setLoading(true);

                api.getCurrentUser()
                    .then(response => {
                        this.userInfo = response;

                        this.setLoading(false);
                    })
                    .catch(error => {
                        this.response.message = error.respone.message;
                        this.response.status = false;

                        this.setLoading(false);
                    });
            },

            /**
             * Update user's info
             */
            updateUser() {
                if (this.userInfo.password === undefined || this.userInfo.password === this.password_confirmation) {
                    let args = {
                        id: this.userInfo.id,
                        email: this.userInfo.email,
                        password: this.userInfo.password
                    };

                    this.setLoading(true);

                    api.updateUser(args)
                        .then(response => {
                            this.response.message = `User ${response.name} updated`;
                            this.response.status = true;

                            this.setLoading(false);
                        })
                        .catch(error => {
                            this.response.message = error.response.data.message;
                            this.response.status = false;
                            if (error.response.data.errors) {
                                this.response.errors = error.response.data.errors;
                            }

                            this.setLoading(false);
                        });
                } else {
                    this.response.message = 'Passwords not validated';
                    this.response.status = false;

                    this.setLoading(false);
                }
            },

            /**
             * Generate and get new user api_key
             */
            generateApiKey() {
                this.setLoading(true);

                api.generateApiKey(this.userInfo.id)
                    .then(response => {
                        this.userInfo.api_key = response.api_key;

                        this.setLoading(false);
                    })
                    .catch(error => {
                        this.response.message = error.respone.message;
                        this.response.status = false;

                        this.setLoading(false);
                    });
            },

            /**
             * Read XML file and import data
             */
            fileUploaded(fileAdded) {
                return new Promise((resolve, reject) => {
                    if(fileAdded) {
                        resolve(fileAdded);
                    } else {
                        reject('File error');
                    }
                });
            },

            /**
             * Remove file on file error
             */
            removeFile(file){
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = await api.removeFile(file);

                        resolve(response);
                    } catch(error) {
                        reject(error);
                    }
                });
            },

            /**
             * Display the error on every error
             */
            handleError(error) {
                this.response.message = error;
                this.response.status = false;
            },

            /**
             * Start uploading file
             */
            uploadFile() {
                uploadFiles.startUpload(this.userId, '#file', this.fileUploaded, this.removeFile, this.handleError, 500000000);
            },

            async importDataFromXML(file) {
                let choise = confirm('Are you sure you want to import bookmarks?');

                if(choise) {
                    this.setLoading(true);

                    file.user_id = this.userInfo.id;

                    try {
                        let response = await api.importDataFromXML(file);

                        this.response.message = response.message;
                        this.response.status = true;

                        this.setLoading(false);
                        this.setFiles([]);
                    } catch (error) {
                        this.setLoading(false);

                        this.response.message = error.response.data.message ? error.response.data.message : error;
                        this.response.status = false;
                    }
                }

                // TODO else delete uploaded file
            }

        }
    }

</script>

<style scoped>

    input[readonly] {
        cursor: text;
        background-color: #fff;
    }

</style>