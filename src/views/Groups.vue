<template>
    <div class="mt-3">
        <ManageGroups v-if="userId !== 0" />
    </div>
</template>

<script>
    // @ is an alias to /src
    import ManageGroups from '@/components/groups/ManageGroups.vue';
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