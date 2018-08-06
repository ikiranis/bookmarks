<template>
    <div class="manageGroups container">
        <h3 class="text-center">List of Groups</h3>

        <div class="row">

            <div class="col-lg-4 col-12 mt-3" v-for="group in groups" :key="group.id">
                <div class="card">
                    <!--<img class="card-img-top" src="..." alt="Card image cap">-->
                    <div class="card-body">
                        <router-link :to="{ name: 'group', params: { id: group.id } }">{{ group.name }}</router-link>
                    </div>

                    <div class="card-footer text-center">
                        <span class="btn btn-sm btn-info mx-1" v-on:click="editGroup(group.id)">Edit</span>
                        <span class="btn btn-sm btn-danger mx-1" v-on:click="removeGroup(group.id)">Remove</span>
                    </div>
                </div>
            </div>

        </div>

        <edit-group :groupId="groupId" v-if="isEditGroupOn" />

    </div>
</template>

<script>
    import api from '@/api';
    import EditGroup from './EditGroup';
    import utility from '@/library/utilities';
    import {mapState,mapMutations} from 'vuex';

    export default {

        components: {EditGroup},

        data: () => ({
            groups: [],
            groupId: ''
        }),

        computed: {
            ...mapState(['userId', 'isEditGroupOn'])
        },

        created: function () {
            this.getGroups();
        },

        methods: {

            ...mapMutations(['setIsEditGroupOn']),

            /**
             * Get the list of groups for user with userId
             */
            getGroups() {
                api.getGroups(this.userId)
                    .then(response => {
                        this.groups = response;
                    })
                    .catch(error => console.log(error.response));
            },

            /**
             * Remove group with groupId
             *
             * @param groupId
             */
            removeGroup(groupId) {
                api.removeGroup(groupId)
                    .then(response => {
                        this.groups = utility.removeObjFromArray(this.groups, 'id', response.data.id);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            /**
             * Edit group with groupId
             *
             * @param groupId
             */
            editGroup(groupId) {
                this.groupId = groupId;
                this.setIsEditGroupOn(true);
            }

        }

    }
</script>