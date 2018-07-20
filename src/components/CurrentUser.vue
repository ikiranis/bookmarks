<template>
    <span class="currentUser">
        {{ username }}
    </span>
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
                .catch(error => {
                    console.log(error.response.statusText);
                    if(error.response.statusText === 'Unauthorized') {
                        this.username = 'Not Logged In';
                    }
                });
        }
    }
</script>