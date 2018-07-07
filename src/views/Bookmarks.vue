<template>
    <div class="bookmarks">
        <h1>Bookmarks page</h1>

        <DisplayBookmarks v-bind:bookmarksItems="bookmarksItems"></DisplayBookmarks>
    </div>
</template>


<script>
    // @ is an alias to /src
    import DisplayBookmarks from '@/components/DisplayBookmarks.vue'

    export default {
        name: 'bookmarks',
        components: {
            DisplayBookmarks
        },
        data: function () {
            return {
                bookmarksItems: [
                    {
                        id: 1,
                        text: 'error.gr blog',
                        url: 'http://error.gr'
                    },
                    {
                        id: 2,
                        text: 'West Macedonia Sports',
                        url: 'https://wmsports.gr'
                    },
                    {
                        id: 3,
                        text: 'Apps 4 net',
                        url: 'http://apps4net.eu'
                    }
                ]
            }
        }
    }
</script>