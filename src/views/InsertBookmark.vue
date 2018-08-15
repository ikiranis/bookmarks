<template>
    <div class="container mb-3">

        <BookmarkForm :response="response" :oldFormData="formData" @update="getData" />

        <div class="row">
            <span class="btn btn-success col-lg-6 col-12 mt-3 ml-auto mr-auto" v-on:click="saveBookmark()">Insert bookmark</span>
        </div>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import {mapState} from 'vuex';
    import DisplayError from "@/components/basic/DisplayError";
    import BookmarkForm from "@/components/bookmarks/BookmarkForm";

    export default {

        components: {BookmarkForm, DisplayError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            formData: null
        }),

        computed: {
            ...mapState(['userId'])
        },

        methods: {

            /**
             * Get the data from child component
             */
            getData (data) {
                this.formData = data.formData;
                this.response = data.response;
            },

            /**
             * Clear form fields
             */
            clearForm() {
                this.formData.title = '';
                this.formData.description = '';
                this.formData.image = '';
                this.formData.url = '';
                this.formData.group_id = '';
                this.formData.tags = [];
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
                    image: this.formData.image,
                    tags: this.formData.tags.map(value => value.id)
                };

                console.log(args.tags);
                api.saveBookmark(args)
                    .then(response => {
                        console.log(response)
                        this.response.message = 'Bookmark saved, with Id: ' + response.id;
                        this.response.status = true;
                        this.clearForm();
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