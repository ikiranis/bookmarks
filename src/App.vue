<template>
    <div id="app">

        <div id="nav" class="text-center">
            <router-link to="/">Home</router-link> |

            <span v-if="userId !== 0">
                <router-link to="/insertBookmark">Insert Bookmark </router-link> |
                <router-link to="/groups">Manage groups </router-link> |
            </span>

            <CurrentUser/>
        </div>

        <router-view/>

    </div>

</template>

<script>
    import CurrentUser from "./components/CurrentUser";
    import {mapState} from 'vuex';

    export default {
        components: {CurrentUser},

        computed: {
            ...mapState(['userId'])
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

