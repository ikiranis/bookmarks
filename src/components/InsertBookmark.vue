<template>
    <div class="insertBookmark container">

        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
        </div>

        <div class="form-group my-1">
            <label for="url" class="sr-only">url</label>
            <input type="text" max="800" class="form-control form-control-sm" id="url" name="url" v-model="url">
        </div>

        <span class="btn btn-sm btn-success" v-on:click="saveBookmark()">Insert bookmark</span>
    </div>

</template>

<script>

    export default {
        data: function () {
            return {
                description: '',
                url: ''
            }
        },
        methods: {
            saveBookmark() {
                console.log(this.description + ' ' + this.url);
            }
        }
    }

</script>