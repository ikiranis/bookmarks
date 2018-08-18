<template>
    <div class="my-3 mx-3">

        <div class="card">
            <div class="card-header">
                <strong>{{ user.name }}</strong>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="user.email"></p>

                <div>
                    <input type="text" id="api_key" name="api_key" :value="user.api_key" width="10" disabled />
                    <span class="btn btn-info mx-1" @click="generateApiKey()">Create Api Key</span>

                    <span>api url: {{ apiUrl }}</span>
                </div>

            </div>

            <div class="card-footer text-center">
                <!--<span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark(bookmark.id)">Edit</span>-->
                <!--<span class="btn btn-sm btn-danger mx-1"-->
                      <!--v-on:click="removeBookmark(bookmark.id)">Remove</span>-->
            </div>
        </div>

    </div>

</template>

<script>

    import api from '@/api';

    export default {

        data: () => ({
            user: {}
        }),

        computed: {
            apiUrl: function() {
                return process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_SUFFIX + '/addBookmark/' + this.user.api_key + '/{url}';
            }
        },

        created: function () {
            this.getCurrentUser();
        },

        methods: {

            /**
             * Get current user info
             */
            getCurrentUser() {
                api.getCurrentUser()
                    .then(response => {
                        this.user = response;
                    })
                    .catch(error => {
                        console.log(error.respone.message)
                    });
            },

            /** 
            * Generate and get new user api_key
            */
            generateApiKey() {
                api.generateApiKey(this.user.id)
                    .then(response => {
                        this.user.api_key = response.api_key;
                    })
                    .catch(error => {
                        console.log(error.respone.message)
                    });
            }

        }
    }

</script>