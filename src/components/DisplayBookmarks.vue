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
    import {mapState} from 'vuex';

    export default {
        data: function () {
            return {
                bookmarksItems: ''
            }
        },

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            if (this.userId !== 0) {
                api.getAllBookmarks(this.userId)
                    .then(response => {
                        this.bookmarksItems = response;
                    })
                    .catch(error => console.log(error.response));
            }
        }
    }
</script>