<template>
    <div class="editGroup container bg-light my-3">

        <div class="input-group col-lg-6 col-12">
            <div class="input-group-prepend">
                <label for="group_name" class="input-group-text">Group name</label>
            </div>
            <input type="text" max="50" class="form-control"
                   id="group_name" name="group_name" v-model="groupName">

            <span class="btn btn-success" v-on:click="updateGroup()">Update group</span>
        </div>

        <display-error v-if="response.message" :response="response"/>

    </div>

</template>

<script>

    import api from '@/api';
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "./DisplayError";

    export default {

        components: {DisplayError},

        data: () => ({
            response: {
                message: '',
                status: ''
            },
            groupName: '',
        }),

        props: {
            groupId: String
        },

        computed: {
            ...mapState(['userId', 'isEditGroupOn'])
        },

        created: function () {
            this.getGroup(this.groupId);
        },

        watch: {
            groupId: function (changedValue) {
                this.getGroup(changedValue);
            }
        },

        methods: {

            ...mapMutations(['setIsEditGroupOn']),

            /**
             * Get the group with groupId
             */
            getGroup(groupId) {
                api.getGroup(groupId)
                    .then(response => {
                        this.groupName = response.name;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            /**
             * Store the new bookmark under the bookmarks of user with userId and in group with selectedGroupId
             */
            updateGroup() {
                let args = {
                    id: this.groupId,
                    name: this.groupName
                };

                api.updateGroup(args)
                    .then(response => {
                        this.response.message = response.id;
                        this.response.status = true;

                        this.setIsEditGroupOn(false);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>