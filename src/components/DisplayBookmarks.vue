<template>
    <div class="displayBookmarks container">
        <h3>List of bookmarks</h3>

        <ul v-for="bookmark in bookmarksItems" :key="bookmark.id" class="list-group">
            <li class="list-group-item">
                <a :href="bookmark.url">{{ bookmark.description }} - {{ bookmark.url }}</a>
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
                        description: 'error.gr blog',
                        url: 'http://error.gr'
                    },
                    {
                        id: 2,
                        description: 'West Macedonia Sports',
                        url: 'https://wmsports.gr'
                    },
                    {
                        id: 3,
                        description: 'Apps 4 net',
                        url: 'http://apps4net.eu'
                    }
                ]
            }
        }
    }
</script>