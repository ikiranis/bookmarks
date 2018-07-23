<template>
    <span class="currentUser">
        <span>{{ username ? username : 'Not Logged In' }}</span>
        <span id="logout" @click="logout" v-if="username !== ''"> (Logout)</span>
    </span>

</template>

<script>
    import user from '@/library/user';
    import {mapState, mapActions} from 'vuex';

    export default {
        data: function () {
            return {
                //
            }
        },

        computed: {
            ...mapState(['username']),
            ...mapActions(['getCurrentUser'])
        },

        created: function () {
            this.$store.dispatch('getCurrentUser');
        },

        methods: {
            logout() {
                user.logout();
                user.setUserTokenHeader();
                this.$store.dispatch('getCurrentUser');
            }
        }
    }
</script>

<style lang="scss" scoped>

    #logout {
        cursor: pointer;
    }

</style>
