<template>
    <div class="row">
        <div class="col-lg-9 col-12">
            <div class="input-group">
                <div class="input-group-prepend">
                    <label for="title" class="input-group-text">Title</label>
                </div>
                <input type="text" max="500" class="form-control form-control-sm" id="title" name="title"
                       v-model="formData.title" @input="submitData">
                <form-error v-if="response.errors.title" :error="response.errors.title[0]"/>
            </div>

            <div class="form-group">
                <wysiwyg class="form-control mt-3" placeholder="Description" v-model="formData.description"
                         @input="submitData"></wysiwyg>
                <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
            </div>

            <div class="input-group">
                <div class="input-group-prepend">
                    <label for="tag" class="input-group-text">Tag</label>
                </div>
                <input type="text" max="255" v-model="formData.tag" class="form-control form-control-sm"
                       id="tag" name="tag">

                <span class="btn btn-success mx-1" v-on:click="insertTag">Προσθήκη</span>

            </div>

            <div class="my-2 row">
                <span class="my-1 mx-2 px-2 bg-primary text-light" :key="tag.id" v-for="tag in formData.tags">{{ tag.name }}</span>
            </div>

            <div class="input-group">
                <div class="input-group-prepend">
                    <label for="url" class="input-group-text">url</label>
                </div>
                <input type="text" max="800" class="form-control form-control-sm" id="url" name="url"
                       v-model="formData.url" @input="submitData">
                <span class="btn btn-info mx-1" v-on:click="getMetadata()">Get Metadata</span>
                <form-error v-if="response.errors.url" :error="response.errors.url[0]"/>
            </div>

            <div class="row my-3">
                <div class="input-group col-lg-6 col-12">
                    <div class="input-group-prepend">
                        <label for="group_id" class="input-group-text">Choose group</label>
                    </div>
                    <select class="form-control " id="group_id" name="group_id" v-model="formData.group_id">
                        <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}
                        </option>
                    </select>
                </div>

                <div class="input-group col-lg-6 col-12">
                    <div class="input-group-prepend">
                        <label for="group_name" class="input-group-text">Group name</label>
                    </div>
                    <input type="text" max="50" class="form-control"
                           id="group_name" name="group_name" v-model="formData.groupName" @input="submitData">

                    <span class="btn btn-info mx-1" v-on:click="saveGroup()">Insert new group</span>
                </div>

                <form-error v-if="response.errors.name" :error="response.errors.name[0]"/>
            </div>
        </div>

        <div class="col-lg-3 col-12">
            <img :src="formData.image === '' ? 'http://via.placeholder.com/350x350' : formData.image" width="100%">
        </div>
    </div>
</template>

<script>

    import api from '@/api';
    import FormError from "../basic/FormError";
    import {mapState} from 'vuex';

    export default {

        components: {FormError},

        props: {
            response: Object,
            oldFormData: Object
        },

        data: () => ({
            formData: {
                title: '',
                description: '',
                url: '',
                group_id: '',
                groupName: '',
                image: '',
                tags: [],
                tag: ''
            },
            groups: []
        }),

        computed: {
            ...mapState(['userId']),

            myData: function () {
                return {
                    formData: this.formData,
                    response: this.response
                }
            }
        },

        watch: {
            userId: function () {
                this.getGroups();
            }
        },

        created: function () {
            if (this.oldFormData !== null) {
                this.formData = this.oldFormData;
                this.getGroups();
            } else {
                this.getGroups();
            }
        },

        methods: {

            /**
             * Send data back to parent component
             */
            submitData() {
                this.$emit('update', this.myData);
            },

            /**
             * Get the list of groups for the user with userId
             */
            getGroups() {
                if (this.userId !== 0) {
                    api.getGroups(this.userId)
                        .then(response => {
                            if (response.length !== 0) {
                                this.groups = response;
                            }
                        })
                        .catch(error => {
                            this.response.message = error.response.data.message;
                            this.response.status = false;
                            this.submitData();
                        });
                }
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
                        this.groups.push(response);
                        this.formData.groupName = '';
                        this.formData.group_id = response.id;
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors;
                        }
                        if (error.response.status === 450) {
                            this.formData.group_id = error.response.data.groupId
                        }
                        this.submitData();
                    });

            },

            /**
             * Clear form fields
             */
            clearForm() {
                this.formData.title = '';
                this.formData.description = '';
                this.formData.image = '';
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

                return '';
            },

            /**
             * Parse the metadata for this.formData.url
             */
            getMetadata() {
                api.getMetadata(this.formData.url)
                    .then(response => {
                        this.clearForm(); // clear form
                        // console.log(response.tags)
                        this.formData.description = this.getDescriptionText(response.tags);
                        this.formData.title = this.getTitleText(response.tags);
                        this.formData.image = this.getImageUrl(response.tags);
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                        this.submitData();
                    });
            },

            /**
             * Insert new tag
             */
            insertTag() {
                let args = {
                    name: this.formData.tag
                };

                api.insertTag(args)
                    .then(response => {
                        this.formData.tags.push({id: response.id, name: response.name});
                        this.formData.tag = '';
                        this.submitData();
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                        this.submitData();
                    });

            }

        }
    }

</script>