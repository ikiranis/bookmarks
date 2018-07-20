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
                                           required autofocus>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"
                                           v-model="credentials.password" required>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <button type="submit" class="btn btn-primary w-100" @click.prevent="login">
                                        Login
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div v-if="responseMessage"
                     class="alert my-3"
                     :class="responseStatus ? 'alert-success' : 'alert-danger'"
                     role="alert">
                    {{ responseMessage }}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import user from "@/library/user";

    export default {
        data: function () {
            return {
                responseMessage: '',
                responseStatus: '',
                credentials: {
                    username: 'rocean74@gmail.com',
                    password: '123456'
                }
            }
        },
        methods: {
            login() {
                api.login(this.credentials.username, this.credentials.password)
                    .then(response => {
                        user.login(response.data.access_token, response.data.token_type);

                        this.responseMessage = response.statusText;
                        this.responseStatus = true;

                        this.$store.state.userLoggedIn = true;

                        user.setUserTokenHeader();
                    })
                    .catch(error => {
                        this.responseMessage = error.response.data.message;
                        this.responseStatus = false;
                    });
            }
        }
    }
</script>