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
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" @click.prevent="register">
                                        Register
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

    export default {
        data: function () {
            return {
                responseMessage: '',
                responseStatus: '',
                userInfo: {
                    name: '',
                    email: '',
                    password: ''
                },
                password_confirmation: ''
            }
        },
        methods: {
            register() {
                if(this.userInfo.password === this.password_confirmation) {
                    api.register(this.userInfo)
                        .then(response => {
                            console.log(response);
                            this.responseMessage = response.statusText;
                            this.responseStatus = true;
                        })
                        .catch(error => {
                            console.log(error);
                            this.responseMessage = error.response.data.message;
                            this.responseStatus = false;
                        });
                } else {
                    this.responseMessage = 'Passwords not validated';
                    this.responseStatus = false;
                }
            }
        }
    }
</script>