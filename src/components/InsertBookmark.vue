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

        <span class="btn btn-sm btn-success my-3" v-on:click="saveBookmark()">Insert bookmark</span>
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

                let myData = {
                    url: this.url,
                    description: this.description
                };

                axios.post('http://localhost:7891/api/bookmark', myData)
                    .then(response => {
                        console.log(response.data.id);
                    })
                    .catch(e => console.log(e));
            }
        }
    }

</script>