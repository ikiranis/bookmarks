<template>
    <div class="container my-3">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Send reset token</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="email"
                                           required data-lpignore="true" readonly
                                           onfocus="this.removeAttribute('readonly');">
                                    <form-error v-if="response.errors.email" :error="response.errors.email[0]"/>
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <div class="col-md-8 mx-auto">
                                    <button type="submit" class="btn btn-info btn-block" @click.prevent="sendToken">
                                        Send me reset token
                                    </button>
                                </div>
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

    import api from "../api";
    import Loading from "@/components/basic/Loading";
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "@/components/basic/DisplayError";
    import FormError from "@/components/basic/FormError";

    export default {

        components: {Loading, DisplayError, FormError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            email: ''
        }),

        computed: {
            ...mapState(['loading'])
        },

        methods: {

            ...mapMutations(['setLoading']),


            async sendToken() {
                let args = {
                    email: this.email,
                    app_path: window.location.origin + '/resetPassword/'
                };

                this.response = {
                    message: '',
                    status: '',
                    errors: []
                };

                this.setLoading(true);

                try {
                    let response = await api.sendResetToken(args);

                    this.response.message = response.data.message;
                    this.response.status = true;

                    this.setLoading(false);
                } catch (error) {
                    this.response.message = error.response.data.message;
                    this.response.status = false;

                    if (error.response.data.errors) {
                        this.response.errors = error.response.data.errors;
                    }

                    this.setLoading(false);
                }
            }

        }
    }

</script>