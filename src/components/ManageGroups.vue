<template>
    <div class="manageGroups container">
        <h3>List of Groups</h3>

        <ul v-for="group in groups" :key="group.id" class="list-group">
            <li class="list-group-item">
                <router-link :to="{ name: 'group', params: { id: group.id } }">{{ group.name }}</router-link>
            </li>
        </ul>

    </div>
</template>

<script>
    import api from '@/api';
    import {mapState} from 'vuex';

    export default {

        data: () => ({
            groups: ''
        }),

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            api.getGroups(this.userId)
                .then(response => {
                    this.groups = response;
                })
                .catch(error => console.log(error.response));
        }

    }
</script>