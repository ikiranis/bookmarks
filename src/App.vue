<template>
    <div id="app">

        <div v-if="apiWorks">

            <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">

                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

                <b-navbar-brand>
                    <router-link class="navbar-brand" to="/">Bookmarks</router-link>
                </b-navbar-brand>

                <b-collapse is-nav id="nav_collapse">

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">

                        <b-nav-item href="#" v-if="userId !== 0">
                            <router-link to="/insertBookmark" class="nav-link">Insert Bookmark</router-link>
                        </b-nav-item>
                        <b-nav-item href="#" v-if="userId !== 0">
                            <router-link to="/groups" class="nav-link">Manage groups</router-link>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <CurrentUser/>
                        </b-nav-item>
                        <b-nav-item href="#"><a class="nav-link" id="logout" @click="logout()"
                                                v-if="username">Logout</a></b-nav-item>

                    </b-navbar-nav>

                </b-collapse>
            </b-navbar>

            <router-view class="mt-5 pt-5"/>

            <b-navbar toggleable="md" type="dark" variant="dark">

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item href="http://apps4net.eu">
                        Created by apps4net.eu
                    </b-nav-item>

                </b-navbar-nav>

            </b-navbar>

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

    .btn-icon {
        cursor: pointer;
    }


</style>

