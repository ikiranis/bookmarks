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
            loggedId: function () {
                return this.username !== 'Not Logged In';
            },

            userLoggedIn: function() {
                return this.$store.state.userLoggedIn;
            }
        },

        watch: {
            userLoggedIn: function () {
                if(this.userLoggedIn) {
                    this.getCurrentUser();
                }

            }
        },

        created: function () {
            this.getCurrentUser();
        },

        methods: {
            getCurrentUser() {
                api.getCurrentUser()
                    .then(response => {
                        this.username = response.name;
                    })
                    .catch(error => {
                        if (error.response.statusText === 'Unauthorized') {
                            this.username = 'Not Logged In';
                        }
                    });

                this.$store.state.userLoggedIn = false;
            },

            logout() {
                user.logout();
                user.setUserTokenHeader();
                this.$store.state.userLoggedIn = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

    #logout {
        cursor: pointer;
    }

</style>
