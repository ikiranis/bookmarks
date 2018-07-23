<template>
    <div class="home">
        <Login v-if="!displayRegister"/>
        <Register v-if="displayRegister"/>
        <span class="btn btn-info my-3" v-if="!displayRegister" @click="displayRegisterComponent">Register User</span>
    </div>
</template>

<script>
    // @ is an alias to /src
    import api from '@/api';

    import Login from '@/components/Login.vue'
    import Register from '@/components/Register.vue'

    export default {
        name: 'home',
        data: function () {
            return {
                displayRegister: false
            }
        },
        beforeCreate: function () {
            api.getUsersCount()
                .then(response => {
                    if(response.count === 0) {
                        this.displayRegister = true;
                    }
                })
                .catch(error => console.log(error.response));
        },
        methods: {
            displayRegisterComponent() {
                this.displayRegister = true;
            }
        },
        components: {
            Login,
            Register
        }
    }
</script>
