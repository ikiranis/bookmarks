<template>
    <div class="manageGroup container">
        <h3>Group: {{ group.name }} with id: {{ group.id }}</h3>

    </div>
</template>

<script>
    import api from '@/api';

    export default {

        data: () => ({
            group: {}
        }),

        props: {
            id: String
        },

        created: function () {
            api.getGroup(this.id)
                .then(response => {
                    this.group = response;
                })
                .catch(error => console.log(error.response));
        }

    }
</script>