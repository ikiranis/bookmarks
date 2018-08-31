import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from '@/api';

export default new Vuex.Store({
    state: {
        username: null,
        userId: 0,
        displayRegister: false,
        isEditBookmarkOn: false,
        isEditGroupOn: false,
        groups: [],
        tags: [],
        files: [],
        rejectedFiles: [],
        progress: 0
    },
    mutations: {

        /**
         * username setter
         *
         * @param state
         * @param username
         */
        setUsername(state, username) {
            state.username = username;
        },

        /**
         * userId setter
         *
         * @param state
         * @param userId
         */
        setUserId(state, userId) {
            state.userId = userId;
        },

        /**
         * displayRegister setter
         *
         * @param state
         * @param value
         */
        setDisplayRegister(state, value) {
            state.displayRegister = value;
        },

        /**
         * isEditBookmarkOn setter
         *
         * @param state
         * @param value
         */
        setIsEditBookmarkOn(state, value) {
            state.isEditBookmarkOn = value;
        },

        /**
         * isEditGroupOn setter
         *
         * @param state
         * @param value
         */
        setIsEditGroupOn(state, value) {
            state.isEditGroupOn = value;
        },

        /**
         * groups setter
         *
         * @param state
         * @param value
         */
        setGroups(state, value) {
            state.groups = value;
        },

        /**
         * tags setter
         *
         * @param state
         * @param value
         */
        setTags(state, value) {
            state.tags = value;
        },

        /**
         * files setter
         *
         * @param state
         * @param value
         */
        setFiles(state, value) {
            state.files = value;
        },

        /**
         * rejectedFiles setter
         *
         * @param state
         * @param value
         */
        setRejectedFiles(state, value) {
            state.rejectedFiles = value;
        },

        /**
         * progress setter
         *
         * @param state
         * @param value
         */
        setProgress(state, value) {
            state.progress = value;
        },

    },
    actions: {

        /**
         * Call api to get the current user and set store variables
         *
         * @param context
         * @returns {Promise<T>}
         */
        getCurrentUser(context) {
            api.getCurrentUser()
                .then(response => {
                    context.commit('setUsername', response.name);
                    context.commit('setUserId', response.id);
                    context.dispatch('getGroups');
                    context.dispatch('getTags');
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        context.commit('setUsername', null);
                        context.commit('setUserId', 0);
                    }
                });
        },

        /**
         * Call api to get list of user's groups
         *
         * @param context
         */
        getGroups(context) {
            context.commit('setGroups', []);
            api.getGroups(context.state.userId)
                .then(response => {
                    if (response.length !== 0) {
                        context.commit('setGroups', response);
                    } else {
                        context.commit('setGroups', []);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        /**
         * Call api to get list of user's tags
         *
         * @param context
         */
        getTags(context) {
            context.commit('setTags', []);
            api.getTags(context.state.userId)
                .then(response => {
                    if (response.length !== 0) {
                        context.commit('setTags', response);
                    } else {
                        context.commit('setTags', []);
                    }
                })
                .catch(error => {
                    console.log(error.response.data.message);
                });
        }

    }
})
