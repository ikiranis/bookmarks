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
    import api from '@/api';

    export default {
        data: function () {
            return {
                bookmarksItems: ''
            }
        },
        mounted: function() {
            api.getAllBookmarks()
                .then(response => {
                        this.bookmarksItems = response;
                    })
                        .catch(error => console.log(error.response));
                }
    }
</script>