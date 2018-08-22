<template>
    <div class="editGroup container bg-light my-3">

        <div class="input-group">
            <div class="input-group-prepend">
                <label for="group_name" class="input-group-text">Group name</label>
            </div>
            <input type="text" max="50" class="form-control"
                   id="group_name" name="group_name" v-model="groupName">

            <span class="btn btn-success ml-1" v-on:click="updateGroup()">Update group</span>

            <form-error v-if="response.errors.name" :error="response.errors.name[0]"/>
        </div>

        <display-error v-if="response.message" :response="response" />

    </div>

</template>

<script>

    import api from '@/api';
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "../basic/DisplayError";
    import FormError from "../basic/FormError";

    export default {

        components: {DisplayError, FormError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
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
                        this.$store.dispatch('getGroups');
                        this.response.message = response.id;
                        this.response.status = true;

                        this.setIsEditGroupOn(false);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors;
                        }
                    });
            }

        }
    }

</script>