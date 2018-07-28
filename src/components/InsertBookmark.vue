<template>
    <div class="insertBookmark container">

        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
        </div>

        <div class="input-group">
            <div class="input-group-prepend">
                <label for="url" class="input-group-text">url</label>
            </div>
            <input type="text" max="800" class="form-control form-control-sm" id="url" name="url" v-model="url">
        </div>

        <span class="btn btn-sm btn-success my-3" v-on:click="saveBookmark()">Insert bookmark</span>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import { mapState } from 'vuex';
    import DisplayError from "./DisplayError";

    export default {
        components: {DisplayError},
        data: function () {
            return {
                response: {
                    message: '',
                    status: ''
                },
                description: '',
                url: ''
            }
        },

        computed: {
            ...mapState(['userId'])
        },

        methods: {
            saveBookmark() {

                let args = {
                    url: this.url,
                    description: this.description,
                    user_id: this.userId,
                    group_id: '0'
                };

                api.saveBookmark(args)
                    .then(response => {
                        this.response.message = response.id;
                        this.response.status = true;
                    })
                    .catch(error => {
                        console.log(error);
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });

            }
        }
    }

</script>