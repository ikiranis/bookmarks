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
    // TODO make it dismissible with counter if it has a specific flag
    export default {

        data() {
            return {
                showDismissibleAlert: true
            }
        },

        props: {
            response: Object
        },

        computed: {
            message: function () {
                return this.response.message;
            }
        },

        watch: {
            message() {
                this.showDismissibleAlert = true;
            }
        }

    }
</script>