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
                               required data-lpignore="true" autocomplete="off">
                        <form-error v-if="response.errors.email" :error="response.errors.email[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                    <div class="col-md-6">
                        <input id="password" type="password" class="form-control"
                               v-model="userInfo.password" data-lpignore="true" autocomplete="off">
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
            password_confirmation: ''
        }),

        computed: {

            ...mapState(['loading']),

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

            ...mapMutations(['setLoading']),

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
            }

        }
    }

</script>