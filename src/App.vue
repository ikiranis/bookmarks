<template>
    <div id="app">

        <div id="nav">
            <router-link to="/">Home</router-link> |
            <span v-if="userId !== 0">
                <router-link to="/bookmark">Insert Bookmark </router-link> |
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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
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

