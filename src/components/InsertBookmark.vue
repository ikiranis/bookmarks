<template>
    <div class="insertBookmark container">

        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
        </div>

        <div class="input-group">
            <div class="input-group-prepend">
                <label for="url" class="input-group-text">url</label>
            </div>
            <input type="text" max="800" class="form-control form-control-sm" id="url" name="url" v-model="url">
        </div>

        <div class="row my-3">
            <div class="input-group col-lg-6 col-12">
                <div class="input-group-prepend">
                    <label for="group_id" class="input-group-text">Choose group</label>
                </div>
                <select class="form-control " id="group_id" name="group_id" v-model="selectedGroupId">
                    <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option>
                </select>
            </div>

            <div class="input-group col-lg-6 col-12">
                <div class="input-group-prepend">
                    <label for="group_name" class="input-group-text">Group name</label>
                </div>
                <input type="text" max="50" class="form-control"
                       id="group_name" name="group_name" v-model="groupName">

                <span class="btn btn-info mx-1" v-on:click="saveGroup()">Insert new group</span>
            </div>
        </div>

        <div class="row">
            <span class="btn btn-success mt-3 ml-auto mr-auto" v-on:click="saveBookmark()">Insert bookmark</span>
        </div>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import {mapState} from 'vuex';
    import DisplayError from "./DisplayError";

    export default {

        components: {DisplayError},

        data: () => ({
            response: {
                message: '',
                status: ''
            },
            description: '',
            url: '',
            groups: [],
            selectedGroupId: 0,
            groupName: ''
        }),

        computed: {
            ...mapState(['userId'])
        },

        created: function () {
            this.getGroups();
        },

        methods: {

            /**
             * Get the list of groups for the user with userId
             */
            getGroups() {
                api.getGroups(this.userId)
                    .then(response => {
                        if (response.length !== 0) {
                            this.groups = response;
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

            /**
             * Store the new group under the groups of the user with userId
             */
            saveGroup() {
                let args = {
                    user_id: this.userId,
                    name: this.groupName
                };

                api.saveGroup(args)
                    .then(response => {
                        this.groups.push(response);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });

            },

            /**
             * Store the new bookmark under the bookmarks of user with userId and in group with selectedGroupId
             */
            saveBookmark() {
                let args = {
                    url: this.url,
                    description: this.description,
                    user_id: this.userId,
                    group_id: this.selectedGroupId
                };

                api.saveBookmark(args)
                    .then(response => {
                        this.response.message = response.id;
                        this.response.status = true;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>