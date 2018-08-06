<template>
    <div class="editBookmark container bg-light my-3">

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
            <span class="btn btn-success my-3 ml-auto mr-auto" v-on:click="updateBookmark()">Update bookmark</span>
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
            description: '',
            url: '',
            groups: [],
            selectedGroupId: '',
            groupName: ''
        }),

        props: {
            bookmarkId: String
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn'])
        },

        created: function () {
            this.getBookmark(this.bookmarkId);
            this.getGroups();
        },

        watch: {
            bookmarkId: function (changedValue) {
                this.getBookmark(changedValue);
            }
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             * Get the bookmark with bookmarkId
             */
            getBookmark(bookmarkId) {
                api.getBookmark(bookmarkId)
                    .then(response => {
                        this.description = response.description;
                        this.url = response.url;
                        this.selectedGroupId = response.group_id;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            },

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
             * Store the new bookmark under the bookmarks of user with userId and in group with selectedGroupId
             */
            updateBookmark() {
                let args = {
                    id: this.bookmarkId,
                    url: this.url,
                    description: this.description,
                    user_id: this.userId,
                    group_id: this.selectedGroupId
                };

                api.updateBookmark(args)
                    .then(response => {
                        this.response.message = response.id;
                        this.response.status = true;

                        this.setIsEditBookmarkOn(false);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>