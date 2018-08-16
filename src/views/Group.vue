<template>
    <div>
        <ManageGroup :id="$route.params.id"/>
    </div>
</template>

<script>
    import ManageGroup from '@/components/groups/ManageGroup.vue';

    export default {

        components: {
            ManageGroup
        }

    }
</script>