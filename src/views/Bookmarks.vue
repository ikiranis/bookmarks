<template>
    <div class="bookmarks">
        <h1>Bookmarks page</h1>

        <DisplayBookmarks></DisplayBookmarks>
    </div>
</template>


<script>
    // @ is an alias to /src
    import DisplayBookmarks from '@/components/DisplayBookmarks.vue'

    export default {
        components: {
            DisplayBookmarks
        }
    }
</script>