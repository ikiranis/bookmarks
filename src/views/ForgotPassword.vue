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

    </div>
</template>

<script>

    import api from "../api";

    export default {

        data: () => ({
            email: 'rocean74@gmail.com'
        }),

        methods: {


            async sendToken() {
                let args = {
                    email: this.email
                };

                try {
                    let response = await api.sendResetToken(args);

                    console.log(response);
                } catch(error) {
                    console.log(error.response.data);
                }
            }

        }
    }

</script>