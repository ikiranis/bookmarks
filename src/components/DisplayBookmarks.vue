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
                bookmarksItems: ''
            }
        },
        mounted: function() {
            axios.get('http://localhost:7893/api/bookmarks')
                .then(response => {
                    this.bookmarksItems = response.data;
                })
                .catch(e => console.log(e));
        }
    }
</script>