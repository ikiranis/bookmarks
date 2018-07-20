<template>
    <div class="currentUser">
        {{ username }}
    </div>
</template>

<script>
    import api from '@/api';

    export default {
        data: function () {
            return {
                username: ''
            }
        },
        created: function () {
            api.getCurrentUser()
                .then(response => {
                    this.username = response.name;
                })
                .catch(error => console.log(error.response.status));
        }
    }
</script>