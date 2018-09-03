<template>
    <div class="manageGroup container">
        <h3 class="text-center">Users in group: {{ group.name }}</h3>

        <div class="users container mt-3">
            <ul v-for="user in users" :key="user.id" class="list-group">
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-lg-8 col-12">
                            {{ user.name }} ({{ user.email }})
                        </div>
                        <div class="col-lg-4 col-12 text-right">
                            <delete-icon class="btn-icon" @click.native="removeUserFromGroup(user.id)" title="Remove user" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="input-group my-3">
            <div class="input-group-prepend">
                <label for="email" class="input-group-text">Insert user in group</label>
            </div>
            <input type="email" class="form-control form-control-sm"
                   id="email" name="email" placeholder="email" v-model="email">

            <span class="btn btn-info mx-1" v-on:click="insertUserInGroup()">Insert user</span>

            <form-error v-if="response.errors.email" :error="response.errors.email[0]" />
        </div>

        <display-error v-if="response.message" :response="response" />

    </div>
</template>

<script>
    import api from '@/api';
    import utility from '@/library/utilities';
    import DisplayError from "../basic/DisplayError";
    import FormError from "../basic/FormError"

    export default {

        components: {DisplayError, FormError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            group: {},
            users: [],
            email: ''
        }),

        props: {
            id: String
        },

        created: function () {
            this.getGroup();
            this.getGroupUsers();
        },

        methods: {

            /**
             * Get details for group with id
             */
            getGroup() {
                api.getGroup(this.id)
                    .then(response => {
                        this.group = response;
                    })
                    .catch(error => console.log(error.response));
            },

            /**
             * Get all users in group with id
             */
            getGroupUsers() {
                api.getGroupUsers(this.id)
                    .then(response => {
                        this.users = response;
                    })
                    .catch(error => console.log(error.response));
            },

            /**
             * Insert the user with email in group
             */
            insertUserInGroup() {
                let args = {
                    email: this.email,
                    id: this.id
                };

                api.insertUserInGroup(args)
                    .then(response => {
                        this.users.push(response.data);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors;
                        }
                    });
            },

            /**
             * Remove user with userId from group
             *
             * @param userId
             */
            removeUserFromGroup(userId) {
                let args = {
                    userId: userId,
                    groupId: this.id
                };

                api.removeUserFromGroup(args)
                    .then(response => {
                        this.users = utility.removeObjFromArray(this.users, 'id', response.data.id);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }

    }
</script>