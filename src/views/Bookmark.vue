<template>
    <div class="bookmark">
        <InsertBookmark v-if="userId !== 0"></InsertBookmark>
    </div>
</template>

<script>
    // @ is an alias to /src
    import InsertBookmark from '@/components/InsertBookmark.vue';
    import {mapState} from 'vuex';

    export default {
        components: {
            InsertBookmark
        },

        computed: {
            ...mapState(['userId'])
        }
    }
</script>