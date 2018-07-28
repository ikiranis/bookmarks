<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" v-model="userInfo.name" required autofocus>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="userInfo.email" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="userInfo.password" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" v-model="password_confirmation" required>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <button type="submit" class="btn btn-primary w-100" @click.prevent="register">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <display-error v-if="response.message" :response="response"/>

            </div>
        </div>
    </div>
</template>


<script>
    import api from '@/api';
    import { mapMutations } from 'vuex';
    import DisplayError from "./DisplayError";

    export default {
        components: {DisplayError},
        data: function () {
            return {
                response: {
                    message: '',
                    status: ''
                },
                userInfo: {
                    name: '',
                    email: '',
                    password: '',
                    role_id: 2
                },
                password_confirmation: ''
            }
        },
        methods: {
            ...mapMutations(['setDisplayRegister']),

            register() {
                if(this.userInfo.password === this.password_confirmation) {
                    api.register(this.userInfo)
                        .then(response => {
                            this.response.message = response.statusText;
                            this.response.status = true;
                            this.setDisplayRegister(false);
                        })
                        .catch(error => {
                            console.log(error);
                            this.response.message = error.response.data.message;
                            this.response.status = false;
                        });
                } else {
                    this.response.message = 'Passwords not validated';
                    this.response.status = false;
                }
            }
        }
    }
</script>