<template>
    <div class="container">

        <BookmarkForm :res="response" @update="getFormData" />

        <div class="row">
            <span class="btn btn-success mt-3 ml-auto mr-auto" v-on:click="saveBookmark()">Insert bookmark</span>
        </div>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import {mapState} from 'vuex';
    import DisplayError from "../basic/DisplayError";
    import BookmarkForm from "./BookmarkForm";

    const defaultImage = 'http://via.placeholder.com/350x350';

    export default {

        components: {BookmarkForm, DisplayError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            formData: {}
        }),

        computed: {
            ...mapState(['userId'])
        },

        methods: {

            /**
             * Get the formData from child component
             */
            getFormData (formData) {
                this.formData = formData
            },

            /**
             * Clear form fields
             */
            clearForm() {
                this.formData.title = '';
                this.formData.description = '';
                this.formData.image = defaultImage;
            },

            /**
             * Store the new bookmark under the bookmarks of user with userId and in group with selectedGroupId
             */
            saveBookmark() {
                let args = {
                    url: this.formData.url,
                    title: this.formData.title,
                    description: this.formData.description,
                    user_id: this.userId,
                    group_id: this.formData.group_id,
                    image: (this.formData.image === defaultImage) ? '' : this.formData.image
                };

                api.saveBookmark(args)
                    .then(response => {
                        this.response.message = 'Boomark saved, with Id: ' + response.id;
                        this.response.status = true;
                        this.clearForm(); // clear form
                        this.formData.url = '';
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