<template>
    <div class="text-center">
        <b-alert class="my-3"
                 :variant="response.status ? 'success' : 'danger'"
                 dismissible
                 :show="showDismissibleAlert"
                 @dismissed="showDismissibleAlert=false">
            {{ response.message }}
        </b-alert>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                showDismissibleAlert: true
            }
        },

        props: {
            response: Object
        }

    }
</script>