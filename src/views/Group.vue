<template>
    <div class="group">
        <ManageGroup :id="id"/>
    </div>
</template>

<script>
    import ManageGroup from '@/components/ManageGroup.vue';

    export default {

        data: () => ({
            id: this.$route.params.id // Get id from route params
        }),

        components: {
            ManageGroup
        }

    }
</script>