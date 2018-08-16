<template>
    <!-- TODO edit form with modal -->
    <div class="my-3">

        <BookmarkForm :response="response" :oldFormData="formData" @update="getData" />

        <div class="row">
            <span class="btn btn-success col-lg-6 col-12 my-3 ml-auto mr-auto" v-on:click="updateBookmark()">Update bookmark</span>
        </div>

        <display-error v-if="response.message" :response="response" />
    </div>

</template>

<script>

    import api from '@/api';
    import {mapState, mapMutations} from 'vuex';
    import DisplayError from "../basic/DisplayError";
    import BookmarkForm from "./BookmarkForm";
    import Utilities from "@/library/utilities";

    export default {

        components: {DisplayError, BookmarkForm},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            formData: {}
        }),

        props: {
            bookmark: Object
        },

        computed: {
            ...mapState(['userId', 'isEditBookmarkOn'])
        },

        created: function () {
            this.formData = this.bookmark;
        },

        methods: {

            ...mapMutations(['setIsEditBookmarkOn']),

            /**
             * Get the data from child component
             */
            getData (data) {
                this.formData = data.formData;
                this.response = data.response;
            },

            /**
             * Store the new bookmark under the bookmarks of user with userId and in group with selectedGroupId
             */
            updateBookmark() {
                let args = {
                    id: this.formData.id,
                    url: this.formData.url,
                    title: this.formData.title,
                    description: Utilities.checkIfHTMLTextIsEmpty(this.formData.description) ? '' : this.formData.description,
                    user_id: this.userId,
                    group_id: this.formData.group_id,
                    image: this.formData.image,
                    tags: this.formData.tags.map(value => value.id)
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
                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors;
                        }
                    });
            }

        }
    }

</script>