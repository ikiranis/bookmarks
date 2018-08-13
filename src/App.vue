<template>
    <div id="app">

        <div v-if="apiWorks">
            <div id="nav" class="text-center">
                <router-link to="/">Home</router-link> |
                <span v-if="userId !== 0">
                    <router-link to="/insertBookmark">Insert Bookmark</router-link> |
                    <router-link to="/groups">Manage groups</router-link> |
                </span>

                <CurrentUser/>
            </div>

            <router-view/>
        </div>

        <div v-else>
            Api not works
        </div>

    </div>

</template>

<script>
    import api from "@/api";
    import CurrentUser from "@/components/users/CurrentUser";
    import {mapState} from 'vuex';

    export default {
        components: {CurrentUser},

        data: () => ({
            apiWorks: true
        }),

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            this.getApiWorks();
        },

        methods: {

            getApiWorks() {
                api.getApiWorks()
                    .then(() => {
                        this.apiWorks = true;
                    })
                    .catch(error => {
                        console.log(error.response.data.message);
                        this.apiWorks = false;
                    });
            }

        }
    }
</script>

<style lang="scss">
    // Fonts
    @import url("https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,600");

    #app {
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

