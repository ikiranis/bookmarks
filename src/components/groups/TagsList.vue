<template>

    <b-navbar type="light" variant="light" class="my-3">

        <b-navbar-toggle target="tags_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            Tags
        </b-navbar-brand>

        <b-collapse is-nav id="tags_collapse">

            <b-navbar-nav class="ml-auto">
                <b-nav-item v-for="tag in tags" :key="tag.id">
                    <router-link :to="{ name: 'tagSearch', params: { id: tag.id } }"
                                 :key="tag.id">
                        {{ tag.name }}
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script>
    export default {

        props: {
            tags: Array
        }

    }
</script>