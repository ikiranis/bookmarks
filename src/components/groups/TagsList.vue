<template>

    <b-navbar type="light" variant="light" class="my-3">

        <b-navbar-toggle target="tags_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            <small>Tags</small>
        </b-navbar-brand>

        <b-collapse id="tags_collapse">

            <b-navbar-nav class="ml-auto">
                <b-nav-item class="row text-center">
                    <span v-for="tag in tags" :key="tag.id">
                        <router-link :to="{ name: 'tagSearch', params: { id: tag.id } }"
                                     :key="tag.id">
                            <span class="badge badge-secondary mx-1 mt-1">{{ tag.name }}({{ tag.count }})</span>
                        </router-link>

                        <div v-if="tags.length === 0" class="badge badge-secondary">No Tags</div>
                    </span>
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