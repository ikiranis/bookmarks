<template>

    <b-navbar type="light" variant="light" class="my-3">

        <b-navbar-toggle target="groups_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            <small>Groups</small>
        </b-navbar-brand>

        <b-collapse is-nav id="groups_collapse">

            <b-navbar-nav class="ml-auto">
                <b-nav-item class="row text-center">
                    <span v-for="group in groups" :key="group.id">
                        <router-link :to="{ name: 'groupSearch', params: { id: group.id } }"
                                     :key="group.id">
                            <span class="badge badge-secondary mx-1 mt-1">{{ group.name }}({{ group.count}})</span>
                        </router-link>
                    </span>

                    <div v-if="groups.length === 0" class="badge badge-secondary">No Groups</div>
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