<template>
    <div class="group">
        <ManageGroup :id="$route.params.id"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import ManageGroup from '@/components/ManageGroup.vue';
    import {mapState} from 'vuex';

    export default {

        components: {
            ManageGroup
        },

        computed: {
            ...mapState(['userId'])
        }

    }
</script>