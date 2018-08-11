<template>
    <div class="alert alert-danger mt-2 w-100 small">
        {{ error }}
    </div>
</template>

<script>
    export default {
        props: {
            error: String
        }
    }
</script>