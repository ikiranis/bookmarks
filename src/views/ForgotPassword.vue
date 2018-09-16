<template>
    <div>
        <div class="form-group row">
            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
            <div class="col-md-6">
                <input id="email" type="email" class="form-control" v-model="email"
                       required data-lpignore="true" readonly onfocus="this.removeAttribute('readonly');">
            </div>
        </div>

        <div class="form-group mb-3">
            <div class="col-md-8 mx-auto">
                <button type="submit" class="btn btn-info btn-block" @click.prevent="sendToken">
                    Send me reset token
                </button>
            </div>
        </div>

        <loading :loading="loading" />

    </div>
</template>

<script>

    import api from "../api";
    import Loading from "../components/basic/Loading";
    import {mapState, mapMutations} from 'vuex';

    export default {

        components: {Loading},

        data: () => ({
            email: 'rocean74@gmail.com'
        }),

        computed: {
            ...mapState(['loading'])
        },

        methods: {

            ...mapMutations(['setLoading']),


            async sendToken() {
                let args = {
                    email: this.email
                };

                this.setLoading(true);

                try {
                    let response = await api.sendResetToken(args);

                    console.log(response);

                    this.setLoading(false);
                } catch(error) {
                    console.log(error.response.data);

                    this.setLoading(false);
                }
            }

        }
    }

</script>