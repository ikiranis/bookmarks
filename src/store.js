import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from '@/api';

export default new Vuex.Store({
    state: {
        username: '',
        userId: 0,
        displayRegister: false
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setUserId(state, userId) {
            state.userId = userId;
        },
        setDisplayRegister (state, value) {
            state.displayRegister = value;
        }
    },
    actions: {
        getCurrentUser(context) {
            return api.getCurrentUser()
                .then(response => {
                    context.commit('setUsername', response.name);
                    context.commit('setUserId', response.id);
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        context.commit('setUsername', '');
                    }
                });
        }
    }
})
