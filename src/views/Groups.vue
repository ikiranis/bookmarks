<template>
    <div class="groups">
        <ManageGroups v-if="userId !== 0" />
    </div>
</template>

<script>
    // @ is an alias to /src
    import ManageGroups from '@/components/ManageGroups.vue';
    import {mapState} from 'vuex';

    export default {
        components: {
            ManageGroups
        },

        computed: {
            ...mapState(['userId'])
        }
    }
</script>