<template>
    <div class="container-fluid">
        <div v-if="!username">
            <Login v-if="!displayRegister  && userToken !== null"/>
            <div class="row">
                <span class="btn btn-info my-3 ml-auto mr-auto" v-if="!displayRegister  && userToken !== null"
                      @click="displayRegisterComponent">Register User</span>
            </div>
        </div>
        <display-bookmarks :searchId="searchId" :routeName="routeName" v-else/>

        <Register v-if="displayRegister"/>
        <div class="row">
            <span class="btn btn-info my-3 ml-auto mr-auto" v-if="displayRegister" @click="displayLoginComponent">Login User</span>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import api from '@/api';

    import Login from '@/components/users/Login.vue'
    import Register from '@/components/users/Register.vue'
    import {mapState, mapMutations} from 'vuex';
    import DisplayBookmarks from "@/components/bookmarks/DisplayBookmarks";

    export default {

        name: 'home',

        computed: {
            ...mapState(['displayRegister', 'username']),

            searchId: function() {
                return this.$route.params.id;
            },

            routeName: function () {
                return this.$route.name;
            },

            userToken: function () {
                return localStorage.accessToken ? localStorage.accessToken : null;
            }

        },

        beforeCreate: function () {
            api.getUsersCount()
                .then(response => {
                    if (response.count === 0) {
                        this.setDisplayRegister(true);
                    }
                })
                .catch(error => console.log(error.response));
        },

        methods: {
            ...mapMutations(['setDisplayRegister']),

            displayRegisterComponent() {
                this.setDisplayRegister(true);
            },
            displayLoginComponent() {
                this.setDisplayRegister(false);
            }
        },

        components: {
            DisplayBookmarks,
            Login,
            Register
        }

    }
</script>
