import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from '@/api';

export default new Vuex.Store({
    state: {
        username: '',
        userId: 0,
        displayRegister: false,
        isEditBookmarkOn: false
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
        setDisplayRegister (state, value) {
            state.displayRegister = value;
        },

        /**
         * isEditBookmarkOn setter
         *
         * @param state
         * @param value
         */
        setIsEditBookmarkOn (state, value) {
            state.isEditBookmarkOn = value;
        }

    },
    actions: {

        /**
         * Call api to get the current user and set store variables
         *
         * @param context
         * @returns {Promise<T>}
         */
        getCurrentUser(context) {
            return api.getCurrentUser()
                .then(response => {
                    context.commit('setUsername', response.name);
                    context.commit('setUserId', response.id);
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        context.commit('setUsername', '');
                        context.commit('setUserId', 0);
                    }
                });
        }

    }
})
