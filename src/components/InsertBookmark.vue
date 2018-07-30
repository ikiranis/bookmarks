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

        <div class="form-group my-3">
            <label for="group_id" class="sr-only">Group</label>
            <select class="form-control form-control-sm" id="group_id" name="group_id" v-bind="group_id">
                <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option>
            </select>
         </div>

        <div class="input-group">
            <div class="input-group-prepend">
                <label for="group_name" class="input-group-text">Insert new group</label>
            </div>
            <input type="text" max="800" class="form-control form-control-sm" id="group_name" name="group_name" >
        </div>

        <span class="btn btn-sm btn-success my-3" v-on:click="saveBookmark()">Insert bookmark</span>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import { mapState } from 'vuex';
    import DisplayError from "./DisplayError";

    export default {
        components: {DisplayError},
        data: function () {
            return {
                response: {
                    message: '',
                    status: ''
                },
                description: '',
                url: '',
                groups: [
                    {
                        id: 'dsadsds',
                        name: 'paokares'
                    },
                    {
                        id: 'ddffdsfgffd',
                        name: 'pasokares'
                    }
                ],
                group_id: ''
            }
        },

        computed: {
            ...mapState(['userId'])
        },

        created: function() {
            this.getGroups();
        },

        methods: {
            getGroups() {
                api.getGroups(this.userId)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        //
                    });
            },

            saveBookmark() {

                let args = {
                    url: this.url,
                    description: this.description,
                    user_id: this.userId,
                    group_id: '0'
                };

                api.saveBookmark(args)
                    .then(response => {
                        this.response.message = response.id;
                        this.response.status = true;
                    })
                    .catch(error => {
                        console.log(error);
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });

            }
        }
    }

</script>