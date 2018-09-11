<template>
    <div class="mx-3">

        <BookmarkContent :bookmark="bookmark" :bookmarksList="false" v-if="bookmark.id"/>

        <display-error v-if="response.message" :response="response"/>

    </div>

</template>

<script>

    import api from '@/api';
    import BookmarkContent from "@/components/bookmarks/BookmarkContent";
    import DisplayError from "@/components/basic/DisplayError";

    export default {
        components: {DisplayError, BookmarkContent},
        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            bookmark: {}
        }),

        created: function () {
            this.getBookmark(this.$route.params.id);
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
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>