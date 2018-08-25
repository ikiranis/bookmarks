<template>

    <b-navbar type="light" variant="light" class="my-3">

        <b-navbar-toggle target="groups_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            Groups
        </b-navbar-brand>

        <b-collapse is-nav id="groups_collapse">

            <b-navbar-nav class="ml-auto">
                <b-nav-item v-for="group in groups" :key="group.id">
                    <router-link :to="{ name: 'groupSearch', params: { id: group.id } }"
                                 :key="group.id">
                        {{ group.name }}
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script>
    export default {

        props: {
            groups: Array
        }

    }
</script>