<template>
    <div class="row my-2" v-if="loading">
        <img src="@/assets/loader.gif" class="mx-auto">
    </div>
</template>

<script>

    export default {

        props: {
            loading: Boolean
        }

    }

</script>