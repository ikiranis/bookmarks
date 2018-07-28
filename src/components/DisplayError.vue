<template>
    <div class="errorElement">
        <div class="alert my-3"
             :class="response.status ? 'alert-success' : 'alert-danger'"
             role="alert">
            {{ response.message }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            response: Object
        }
    }
</script>