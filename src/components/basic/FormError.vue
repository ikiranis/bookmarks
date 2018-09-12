<template>
    <div class="mt-2 w-100 small">
        <b-alert variant="danger"
                 dismissible
                 :show="showDismissibleAlert"
                 @dismissed="showDismissibleAlert=false">
            {{ error }}
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
            error: String
        },

        watch: {
            error() {
                this.showDismissibleAlert = true;
            }
        }

    }
</script>