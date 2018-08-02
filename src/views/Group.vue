<template>
    <div class="group">
        <ManageGroup :id="$route.params.id"/>
    </div>
</template>

<script>
    import ManageGroup from '@/components/ManageGroup.vue';

    export default {

        components: {
            ManageGroup
        }

    }
</script>