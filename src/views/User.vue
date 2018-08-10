<template>
    <div class="container bg-light my-3">

        <div class="card">
            <div class="card-header">
                <strong>{{ user.name }}</strong>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="user.email"></p>

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

        created: function () {
            this.getCurrentUser();
        },

        methods: {

            getCurrentUser() {
                return api.getCurrentUser()
                    .then(response => {
                        this.user = response;
                    })
                    .catch(error => {
                        console.log(error.respone.message)
                    });
            }

        }
    }

</script>