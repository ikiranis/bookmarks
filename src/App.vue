<template>
    <div id="app">

        <div v-if="apiWorks">

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

                <router-link class="navbar-brand" to="/">Bookmarks</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav my-auto ml-auto">

                        <li class="nav-item" v-if="userId !== 0">
                            <router-link to="/insertBookmark" class="nav-link">Insert Bookmark</router-link>
                        </li>
                        <li class="nav-item" v-if="userId !== 0">
                            <router-link to="/groups" class="nav-link">Manage groups</router-link>
                        </li>

                        <CurrentUser/>

                        <li class="nav-item">
                            <a class="nav-link" id="logout" @click="logout()" v-if="username">(Logout)</a>
                        </li>

                    </ul>
                </div>

            </nav>

            <router-view class="mt-5 pt-3"/>

        </div>

        <div v-else>
            Api not works
        </div>

    </div>

</template>

<script>
    import api from "@/api";
    import CurrentUser from "@/components/users/CurrentUser";
    import {mapState, mapMutations} from 'vuex';
    import user from '@/library/user';

    export default {
        components: {CurrentUser},

        data: () => ({
            apiWorks: true
        }),

        computed: {
            ...mapState(['userId', 'username'])
        },

        created: function () {
            this.getApiWorks();
        },

        methods: {

            ...mapMutations(['setUsername']),

            getApiWorks() {
                api.getApiWorks()
                    .then(() => {
                        this.apiWorks = true;
                    })
                    .catch(error => {
                        this.apiWorks = false;
                        console.log(error);
                    });
            },

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

<style lang="scss">
    // Fonts
    @import url("https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,600");

    #app {
        color: #2c3e50;
        font-family: 'Alegreya Sans', cursive;
    }

    #logout {
        cursor: pointer;
    }

</style>

