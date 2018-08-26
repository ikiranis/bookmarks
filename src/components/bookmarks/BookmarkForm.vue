<template>
    <div>

        <div class="input-group">
            <div class="input-group-prepend">
                <label for="title" class="input-group-text">Title</label>
            </div>
            <input type="text" max="500" class="form-control form-control-sm" id="title" name="title"
                   v-model="formData.title" @input="submitData">
            <form-error v-if="response.errors.title" :error="response.errors.title[0]"/>
        </div>

        <vue-editor-markdown class="my-2" placeholder="Description" v-model="formData.description"
                             @input="submitData"/>
        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>

        <div class="row">
            <div class="col-lg-9 col-12">

                <div class="input-group mt-3">
                    <div class="input-group-prepend">
                        <label for="url" class="input-group-text">url</label>
                    </div>
                    <input type="text" max="800" class="form-control form-control-sm" id="url" name="url"
                           v-model="formData.url" @input="submitData">
                    <span class="btn btn-info mx-1" v-on:click="getMetadata()">Get Metadata</span>
                    <form-error v-if="response.errors.url" :error="response.errors.url[0]"/>
                </div>

                <div class="input-group mt-3">
                    <div class="input-group-prepend">
                        <label for="tag" class="input-group-text">Tag</label>
                    </div>
                    <input type="text" max="255" v-model="formData.tag" class="form-control form-control-sm"
                           id="tag" name="tag" placeholder="Split tags with comma (,)">

                    <span class="btn btn-secondary mx-1" v-on:click="insertTag">Insert tag</span>

                </div>

                <div class="mt-2 text-center">
                    <span class="btn btn-sm mx-2 btn-secondary mt-1"
                          :key="tag.id" v-for="tag in formData.tags">
                        {{ tag.name }}
                        <span id="removeTag" @click="removeTag(tag.id)" title="Remove Tag">x</span>
                    </span>
                </div>

                <div class="row mt-2">
                    <div class="input-group col-lg-4 col-12 my-1">
                        <div class="input-group-prepend">
                            <label for="group_id" class="sr-only">Choose group</label>
                        </div>
                        <select class="form-control " id="group_id" name="group_id" v-model="formData.group_id">
                            <option value="null" disabled>Choose group</option>
                            <option v-for="group in groups" :key="group.id" :value="group.id">
                                {{ group.name }}
                            </option>
                        </select>
                    </div>

                    <div class="input-group col-lg-4 col-12 my-1">
                        <div class="input-group-prepend">
                            <label for="group_name" class="sr-only">Group name</label>
                        </div>
                        <input type="text" max="50" class="form-control" placeholder="Group name"
                               id="group_name" name="group_name" v-model="formData.groupName" @input="submitData">

                    </div>

                    <div class="col-lg-4 col-12 my-1">
                        <span class="btn btn-info mx-1 w-100" v-on:click="saveGroup()">Insert new group</span>
                    </div>

                    <form-error v-if="response.errors.name" :error="response.errors.name[0]"/>
                </div>

<!--                <div class="custom-file col-lg-6 col-12 px-1 mt-3">
                    <label class="custom-file-label" for="files">Choose files</label>
                    <input type="file" class="custom-file-input" name="files" id="files"
                           accept="*" @change="uploadFiles" multiple>
                </div>-->
            </div>

            <div class="col-lg-3 col-12 text-center">
                <img :src="!formData.image ? 'https://via.placeholder.com/350x350' : formData.image" width="100%">
                <form-error v-if="response.errors.image" :error="response.errors.image[0]"/>
                <button class="btn btn-sm btn-danger mt-2 col-12" @click="removeImage">Remove image</button>
            </div>
        </div>

    </div>
</template>

<script>

    import api from '@/api';
    import FormError from "../basic/FormError";
    import {mapState} from 'vuex';
    import utility from "@/library/utilities";
    import uploadFiles from "@/library/uploadFiles";
    import * as marked from 'marked';

    export default {

        components: {FormError},

        props: {
            response: Object,
            oldFormData: Object
        },

        data: function () {
            return {
                formData: {
                    title: '',
                    description: '',
                    url: '',
                    group_id: 'null',
                    groupName: '',
                    image: '',
                    tags: [],
                    tag: ''
                }
            }
        },

        computed: {
            ...mapState(['userId', 'groups']),

            myData: function () {
                return {
                    formData: this.formData,
                    response: this.response
                }
            }

        },

        created: function () {
            if (this.oldFormData !== null) {
                this.formData = this.oldFormData;
            }

            this.formData.description = {
                markdown: this.formData.description,
                html: marked(this.formData.description, {sanitize: true})
            };
        },

        methods: {

            /**
             * Send data back to parent component
             */
            submitData() {
                this.$emit('update', this.myData);
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
                this.formData.description = {
                    markdown: '',
                    html: ''
                };
                this.formData.image = '';
            },

            /**
             * Parse the metadata for this.formData.url
             */
            getMetadata() {
                let args = {
                    url: this.formData.url
                };

                api.getMetadata(args)
                    .then(response => {
                        this.clearForm(); // clear form
                        this.formData.description = {
                            markdown: response.tags.extractedDescription,
                            html: response.tags.extractedDescription
                        };
                        this.formData.title = response.tags.extractedTitle;
                        this.formData.image = response.tags.extractedImage;
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
                if (this.formData.tag !== '') {
                    let tags = this.formData.tag.split(',');

                    for (let tag in tags) {
                        let args = {
                            name: tags[tag]
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
                } else {
                    this.response.message = 'Empty Tags';
                    this.response.status = false;
                }

            },

            /**
             * Remove tag with tagId
             *
             * @param tagId
             */
            removeTag(tagId) {
                this.formData.tags = utility.removeObjFromArray(this.formData.tags, 'id', tagId);
            },

            removeImage() {
                this.formData.image = '';
            },

            uploadFiles() {
                uploadFiles.startUpload();
            }

        }
    }

</script>

<style scoped>
    .form-control::placeholder {
        color: grey;
        opacity: 0.5;
    }

    #removeTag {
        cursor: pointer;
    }
</style>
