<template>
    <div class="container">

        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="credentials.username"
                                           required autofocus data-lpignore="true">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"
                                           v-model="credentials.password" required data-lpignore="true">
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <button type="submit" class="btn btn-primary w-100" @click.prevent="login">
                                        Login
                                    </button>
                                </div>
                            </div>

                            <div class="row">
                                <router-link to="/forgotPassword" class="nav-link mx-auto">Forgot Password</router-link>
                            </div>

                        </form>
                    </div>
                </div>

                <display-error v-if="response.message" :response="response"/>

                <loading :loading="loading"/>

            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import {mapState, mapMutations} from 'vuex';
    import user from "@/library/user";
    import DisplayError from "../basic/DisplayError";
    import Loading from "../basic/Loading";

    export default {

        components: {Loading, DisplayError},

        data: () => ({
            response: {
                message: '',
                status: ''
            },
            credentials: {
                username: '',
                password: ''
            }
        }),

        computed: {
            ...mapState(['loading'])
        },

        methods: {

            ...mapMutations(['setLoading']),

            /**
             * Do the login
             */
            login() {
                this.setLoading(true);

                api.login(this.credentials.username, this.credentials.password)
                    .then(response => {
                        // Store token to localStorage
                        user.login(response.data.access_token, response.data.token_type);

                        // Set the header for axios
                        user.setUserTokenHeader();

                        // Get the current username and store it
                        this.$store.dispatch('getCurrentUser');

                        this.setLoading(false);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;

                        this.setLoading(false);
                    });
            }

        }

    }
</script>