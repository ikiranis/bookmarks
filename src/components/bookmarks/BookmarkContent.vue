<template>
    <div class="card">
        <img v-if="bookmark.image" class="card-img-top" :src="bookmark.image" alt="Bookmark image">

        <div class="card-header">
            <router-link :to="{ name: 'bookmark', params: { id: bookmark.id } }" :key="$route.fullPath"><strong>{{
                bookmark.title }}</strong></router-link>
        </div>

        <div class="card-body">
            <p class="card-text" v-html="bookmark.description"></p>

            <a :href="bookmark.url">{{ bookmark.url }}</a>
        </div>

        <div class="card-footer text-center">
            <span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark(bookmark.id)">Edit</span>
            <span class="btn btn-sm btn-danger mx-1"
                  v-on:click="removeBookmark(bookmark.id)">Remove</span>
        </div>
    </div>
</template>

<script>

    export default {

        props: {
            bookmark: Object
        }

    }

</script>