<template>
    <span class="currentUser">
        <span>{{ username }}</span>
        <span id="logout" @click="logout" v-if="loggedId"> (Logout)</span>
    </span>

</template>

<script>
    import api from '@/api';
    import user from '@/library/user'

    export default {
        data: function () {
            return {
                username: ''
            }
        },
        computed: {
            loggedId: function() {
                if(this.username === 'Not Logged In') {
                    return false;
                }

                return true;
            }
        },
        created: function () {
            api.getCurrentUser()
                .then(response => {
                    this.username = response.name;
                })
                .catch(error => {
                    if(error.response.statusText === 'Unauthorized') {
                        this.username = 'Not Logged In';
                    }
                });
        },
        methods: {
            logout() {
                user.logout();
                console.log('LOGOUT')
            }
        }
    }
</script>

<style lang="scss" scoped>

    #logout {
        cursor: pointer;
    }

</style>
