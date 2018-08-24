<template>
    <div class="card my-3">
        <div class="card-header">
            <h6 class="text-center"><strong>Groups</strong></h6>
        </div>
        <div class="card-body p-0">
            <ul class="list-group">
                <li class="list-group-item list-group-item-action p-1 small" v-for="group in groups"
                    :key="group.id">
                    <router-link :to="{ name: 'groupSearch', params: { id: group.id } }"
                                 :key="group.id">
                        {{ group.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            groups: Array
        }

    }
</script>