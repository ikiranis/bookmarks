<template>
    <div class="bookmark">
        <h1>Insert Bookmark</h1>

        <InsertBookmark></InsertBookmark>
    </div>
</template>


<script>
    // @ is an alias to /src
    import InsertBookmark from '@/components/InsertBookmark.vue'

    export default {
        components: {
            InsertBookmark
        }
    }
</script>