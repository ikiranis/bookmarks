<template>
    <div class="card my-3">
        <div class="card-header">
            <h6 class="text-center"><strong>Tags</strong></h6>
        </div>
        <div class="card-body p-0">
            <ul class="list-group">
                <li class="list-group-item list-group-item-action p-1 small" v-for="tag in tags"
                    :key="tag.id">
                    <router-link :to="{ name: 'tagSearch', params: { id: tag.id } }"
                                 :key="tag.id">
                        {{ tag.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            tags: Array
        }

    }
</script>