<template>
    <div class="home">
        <Login v-if="!displayRegister"/>
        <Register v-if="displayRegister"/>
        <span class="btn btn-info my-3" v-if="!displayRegister" @click="displayRegisterComponent">Register User</span>
        <span class="btn btn-info my-3" v-if="displayRegister" @click="displayLoginComponent">Login User</span>
    </div>
</template>

<script>
    // @ is an alias to /src
    import api from '@/api';

    import Login from '@/components/Login.vue'
    import Register from '@/components/Register.vue'
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: 'home',
        computed: {
            ...mapState(['displayRegister'])
        },
        beforeCreate: function () {
            api.getUsersCount()
                .then(response => {
                    if(response.count === 0) {
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
            Login,
            Register
        }
    }
</script>
