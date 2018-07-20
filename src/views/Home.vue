<template>
    <div class="home">
        <Login/>
        <Register v-if="displayRegister"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Login from '@/components/Login.vue'
    import Register from '@/components/Register.vue'
    import api from '@/api';

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
                    console.log(response.count)
                    if(response.count === 0) {
                        this.displayRegister = true;
                    }
                })
                .catch(error => console.log(error.response));
        },
        components: {
            Login,
            Register
        }
    }
</script>
