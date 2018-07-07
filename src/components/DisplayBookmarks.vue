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
        props: {
            bookmarksItems: Array
        }
    }
</script>