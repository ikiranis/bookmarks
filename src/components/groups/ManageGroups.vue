<template>
    <div>
        <div class="mx-3" v-if="groups.length > 0">
            <h3 class="text-center">List of Groups</h3>

            <div class="row">

                <div class="col-lg-4 col-12 mt-3" v-for="group in groups" :key="group.id">
                    <div class="card">
                        <div class="card-body">
                            <router-link :to="{ name: 'group', params: { id: group.id } }">{{ group.name }}
                            </router-link>
                        </div>

                        <div class="card-footer">
                            <div v-if="group.user_id === userId" class="text-center">
                                <pencil-icon class="btn-icon" @click.native="editGroup(group.id)" title="Edit group"/>
                                <delete-icon class="btn-icon" @click.native="removeGroup(group.id)"
                                             title="Delete group"/>
                            </div>
                            <div class="row" v-else>
                                <span class="mr-auto px-2">Created by {{ group.owner }}</span>
                                <exit-icon class="btn-icon ml-auto" @click.native="leaveGroup(group.id)"
                                           title="Leave group"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <display-error v-if="response.message" :response="response"/>

            <edit-group :groupId="groupId" v-if="isEditGroupOn"/>

        </div>

        <div v-else class="text-center">
            <b-alert class="mx-3" variant="danger" show>
                Groups not found
            </b-alert>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import EditGroup from './EditGroup';
    import utility from '@/library/utilities';
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "../basic/DisplayError";

    export default {

        components: {DisplayError, EditGroup},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            groupId: ''
        }),

        computed: {
            ...mapState(['userId', 'isEditGroupOn', 'groups'])
        },

        created: function () {
            this.setIsEditGroupOn(false);
        },


        methods: {

            ...mapMutations(['setIsEditGroupOn', 'setGroups']),

            /**
             * Remove group with groupId
             *
             * @param groupId
             */
            removeGroup(groupId) {
                api.removeGroup(groupId)
                    .then(response => {
                        this.setGroups(utility.removeObjFromArray(this.groups, 'id', response.data.id));
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
            },

            /**
             * Remove user with this.userId from group with groupId
             * @param groupId
             */
            leaveGroup(groupId) {
                let args = {
                    userId: this.userId,
                    groupId: groupId
                };

                api.removeUserFromGroup(args)
                    .then(() => {
                        this.setGroups(utility.removeObjFromArray(this.groups, 'id', groupId));
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }

    }
</script>