<template>
    <span class="currentUser">
        <router-link to="/user" v-if="username"><span>{{ username }}</span></router-link>
        <span v-else>Not Logged In</span>

        <span id="logout" @click="logout()" v-if="username"> (Logout)</span>
    </span>

</template>

<script>
    import user from '@/library/user';
    import { mapState, mapActions, mapMutations } from 'vuex';

    export default {

        computed: {
            ...mapState(['username'])
        },

        beforeCreate: function () {
            this.$store.dispatch('getCurrentUser');
        },

        methods: {
            ...mapActions(['getCurrentUser']),
            ...mapMutations(['setUsername']),

            /**
             * Do the logout
             */
            logout() {
                user.logout();
                this.$store.dispatch('getCurrentUser');

                // Hack Alert!!!
                // Force to empty the username, because it need some time to run getCurrentUser and do it
                this.setUsername(null);

                this.$router.push({name: 'home'}); // Force to load home page
            }
        }

    }
</script>

<style lang="scss" scoped>

    #logout {
        cursor: pointer;
    }

</style>
