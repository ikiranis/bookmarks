<template>
    <div class="container bg-light my-3">

        <BookmarkContent :parentBookmark="bookmark" />

    </div>

</template>

<script>

    import api from '@/api';
    import BookmarkContent from "@/components/bookmarks/BookmarkContent";

    export default {
        components: {BookmarkContent},
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