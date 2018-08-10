<template>
    <div class="container bg-light my-3">

        <div class="card">
            <img class="card-img-top" :src="bookmark.image" alt="Card image cap">

            <div class="card-header">
                <strong>{{ bookmark.title }}</strong>
            </div>

            <div class="card-body">
                <p class="card-text" v-html="bookmark.description"></p>

                <a :href="bookmark.url">{{ bookmark.url }}</a>
            </div>

            <div class="card-footer text-center">
                <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark(bookmark.id)">Edit</span>
                <span class="btn btn-sm btn-danger mx-1"
                      v-on:click="removeBookmark(bookmark.id)">Remove</span>
            </div>
        </div>

    </div>

</template>

<script>

    import api from '@/api';

    export default {

        data: () => ({
            bookmark: {}
        }),

        created: function () {
            this.getBookmark(this.$route.params.id);
            // this.getGroups();
        },

        methods: {

            /**
             * Get the bookmark with bookmarkId
             */
            getBookmark(bookmarkId) {
                api.getBookmark(bookmarkId)
                    .then(response => {
                        this.bookmark = response;
                    })
                    .catch(error => {
                        console.log(error.response.data.message);
                    });
            },

            /**
             * Get the list of groups for the user with userId
             */
            getGroups() {
                api.getGroups(this.userId)
                    .then(response => {
                        if (response.length !== 0) {
                            this.groups = response;
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>