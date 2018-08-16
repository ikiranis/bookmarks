<template>
    <div class="mx-3">

        <BookmarkContent :bookmark="bookmark" :bookmarksList="false" />

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
            }

        }
    }

</script>