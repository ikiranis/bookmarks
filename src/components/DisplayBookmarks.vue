<template>
    <div class="displayBookmarks">
        <h3>List of bookmarks</h3>

        <ul v-for="bookmark in bookmarksItems" :key="bookmark.id">
            <li>
                <a :href="bookmark.url">{{ bookmark.text }}</a>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
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