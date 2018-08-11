<template>
    <div class="container">

        <div class="row">
            <div class="col-lg-9 col-12">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label for="title" class="input-group-text">Title</label>
                    </div>
                    <input type="text" max="500" class="form-control form-control-sm" id="title" name="title"
                           v-model="formData.title">
                    <form-error v-if="response.errors.title" :error="response.errors.title[0]"/>
                </div>

                <div class="form-group">
                    <wysiwyg class="form-control mt-3" placeholder="Description" v-model="formData.description"></wysiwyg>
                    <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                </div>

                <div class="input-group">
                    <div class="input-group-prepend">
                        <label for="url" class="input-group-text">url</label>
                    </div>
                    <input type="text" max="800" class="form-control form-control-sm" id="url" name="url"
                           v-model="formData.url">
                    <span class="btn btn-info mx-1" v-on:click="getMetadata()">Get Metadata</span>
                    <form-error v-if="response.errors.url" :error="response.errors.url[0]"/>
                </div>

                <div class="row my-3">
                    <div class="input-group col-lg-6 col-12">
                        <div class="input-group-prepend">
                            <label for="group_id" class="input-group-text">Choose group</label>
                        </div>
                        <select class="form-control " id="group_id" name="group_id" v-model="formData.selectedGroupId">
                            <option v-for="group in formData.groups" :key="group.id" :value="group.id">{{ group.name }}
                            </option>
                        </select>
                    </div>

                    <div class="input-group col-lg-6 col-12">
                        <div class="input-group-prepend">
                            <label for="group_name" class="input-group-text">Group name</label>
                        </div>
                        <input type="text" max="50" class="form-control"
                               id="group_name" name="group_name" v-model="formData.groupName">

                        <span class="btn btn-info mx-1" v-on:click="saveGroup()">Insert new group</span>
                    </div>

                    <form-error v-if="response.errors.name" :error="response.errors.name[0]"/>
                </div>
            </div>

            <div class="col-lg-3 col-12">
                <img :src="formData.image" width="100%">
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
    import DisplayError from "../basic/DisplayError";
    import FormError from "../basic/FormError";

    const defaultImage = 'http://via.placeholder.com/350x350';

    export default {

        components: {DisplayError, FormError},

        data: () => ({
            response: {
                message: '',
                status: '',
                errors: []
            },
            formData: {
                title: '',
                description: '',
                url: '',
                groups: [],
                selectedGroupId: 0,
                groupName: '',
                image: defaultImage
            }
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
                            this.formData.groups = response;
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
                    name: this.formData.groupName
                };

                api.saveGroup(args)
                    .then(response => {
                        this.formData.groups.push(response);
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
                    group_id: this.formData.selectedGroupId,
                    image: this.formData.image
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
            },

            /**
             * Get description text, from any of description tags is possible
             */
            getDescriptionText(tags) {
                if (tags.metaTags.description) {
                    return tags.metaTags.description;
                }

                if (tags.metaProperties['og:description']) {
                    return tags.metaProperties['og:description'];
                }

                if (tags.metaTags['twitter:description']) {
                    return tags.metaTags['twitter:description'];
                }
            },

            /**
             * Get title text, from any of title tags is possible
             */
            getTitleText(tags) {
                if (tags.title) {
                    return tags.title;
                }

                if (tags.metaProperties['og:title']) {
                    return tags.metaProperties['og:title'];
                }

                if (tags.metaTags['twitter:title']) {
                    return tags.metaTags['twitter:title'];
                }
            },

            /**
             * Get image url, from any of image tags is possible
             */
            getImageUrl(tags) {
                if (tags.metaProperties['og:image']) {
                    return tags.metaProperties['og:image'];
                }

                if (tags.metaTags['twitter:image:src']) {
                    return tags.metaTags['twitter:image:src'];
                }

                return defaultImage;
            },

            /**
             * Parse the metadata for this.formData.url
             */
            getMetadata() {
                api.getMetadata(this.formData.url)
                    .then(response => {
                        this.clearForm(); // clear form
                        console.log(response.tags)
                        this.formData.description = this.getDescriptionText(response.tags);
                        this.formData.title = this.getTitleText(response.tags);
                        this.formData.image = this.getImageUrl(response.tags);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    });
            }

        }
    }

</script>