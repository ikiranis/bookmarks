<template>
    <div class="login">
        <span class="btn btn-info" v-on:click="login()">Login</span>
    </div>
</template>

<script>
    import api from '@/api';

    export default {
        data: function () {
            return {
                bookmarksItems: '',
                myCredentials: {
                    username: 'rocean74@gmail.com',
                    password: '123456'
                }
            }
        },
        methods: {
            login() {
                api.login(this.myCredentials.username, this.myCredentials.password)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(e => console.log(e));
            }
        }
    }
</script>