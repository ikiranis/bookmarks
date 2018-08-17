<template>
	<div class="col-lg-6 col-12 mt-3">
		<div class="card">
			<img v-if="bookmark.image" class="card-img-top" :src="bookmark.image" alt="Bookmark image">

			<div class="card-header">
				<div>
					<router-link v-if="bookmarksList" :to="{ name: 'bookmark', params: { id: bookmark.id } }"
								:key="$route.fullPath">
						<strong>{{ bookmark.title }}</strong>
					</router-link>
					<strong v-else>{{ bookmark.title }}</strong>
				</div>
				<div class="text-right" v-if="bookmark.created_at">
					<small>Created at
						<span :title="moment(String(bookmark.created_at.date)).format('DD/MM/YYYY HH:mm')">
								{{ moment(String(bookmark.created_at.date)).format('DD/MM/YYYY') }}
							</span>
						by {{ bookmark.owner }} 6
					</small>
				</div>
			</div>

			<div class="card-body">
				<p class="card-text" v-html="bookmark.description"></p>

				<a :href="bookmark.url" v-if="bookmark.url" target="new">{{ urlParser.hostname }}</a>

				<div class="row mt-2">
					<router-link class="mx-2 px-2 bg-primary text-light"
								:key="tag.id" v-for="tag in bookmark.tags"
								:to="{ name: 'tagSearch', params: { id: tag.id } }">
						{{ tag.name }}
					</router-link>
				</div>
			</div>

			<div class="text-right px-3" v-if="bookmark.group_name">
				<router-link :to="{ name: 'groupSearch', params: { id: bookmark.group_id } }" :key="bookmark.group_id">
					{{ bookmark.group_name }}
				</router-link>
			</div>

			<div class="card-footer text-center" v-if="!bookmarksList && bookmark.user_id === userId">
				<span class="btn btn-sm btn-info mx-1" v-on:click="editBookmark()">Edit</span>
				<span class="btn btn-sm btn-danger mx-1"
					v-on:click="removeBookmark()">Remove</span>
			</div>

			<edit-bookmark :bookmark="bookmark" v-if="isEditBookmarkOn"/>
		</div>
	</div>
</template>

<script>

	import api from '@/api';
	import EditBookmark from './EditBookmark';
	import {mapState, mapMutations} from 'vuex';
	import moment from 'moment';
	import utility from "@/library/utilities";

	export default {

		components: {EditBookmark},

		props: {
			bookmark: Object,
			bookmarksList: Boolean
		},

		computed: {
			...mapState(['userId', 'isEditBookmarkOn']),

			urlParser: function () {
				return utility.parse_url(this.bookmark.url);
			}
		},

		created: function () {
			this.setIsEditBookmarkOn(false);
		},

		methods: {

			...mapMutations(['setIsEditBookmarkOn']),

			/**
			 * Remove bookmark with this.bookmark.id
			 */
			removeBookmark() {
				api.removeBookmark(this.bookmark.id)
					.then(() => {
						this.$router.push({path: '/'}); // Force to load home page
					})
					.catch(error => {
						this.response.message = error.response.data.message;
						this.response.status = false;
					});
			},

			/**
			 *
			 */
			editBookmark() {
				this.setIsEditBookmarkOn(true);
			},

			moment
		}

	}

</script>