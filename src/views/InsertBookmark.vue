<template>
    <div class="mb-3 mx-3">
        <BookmarkForm :response="response" :oldFormData="formData" @update="getData" />

        <div class="row">
            <span class="btn btn-success col-lg-6 col-12 mt-3 ml-auto mr-auto" v-on:click="saveBookmark()">Insert bookmark</span>
        </div>

        <display-error v-if="response.message" :response="response"/>
    </div>

</template>

<script>

    import api from '@/api';
    import {mapState, mapActions} from 'vuex';
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

            ...mapActions(['getGroups', 'getTags']),

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
                this.formData.description = {};
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
                    description: this.formData.description.markdown,
                    user_id: this.userId,
                    group_id: this.formData.group_id,
                    image: this.formData.image,
                    tags: this.formData.tags.map(value => value.id)
                };

                // TODO if you have this post https://m.sport24.gr/football/omades/Giouventous/to-mystiko-toy-ronalnto-ekane-proponhsh-stis-2-ta-kshmerwmata-meta-apo-taksidia.5292742.html
                // the image is invalid "//www.sport24.gr/incoming/article4760866.ece/BINARY/original/Default-og-image.png"

                api.saveBookmark(args)
                    .then(response => {
                        // console.log(response)
                        this.response.message = 'Bookmark saved, with Id: ' + response.id;
                        this.response.status = true;
                        this.clearForm();
                        this.getGroups();
                        this.getTags();
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