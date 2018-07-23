import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from '@/api';

export default new Vuex.Store({
    state: {
        username: ''
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        }
    },
    actions: {
        getCurrentUser (context) {
            return api.getCurrentUser()
                .then(response => {
                    context.commit('setUsername', response.name);
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        context.commit('setUsername', '');
                    }
                });
        }
    }
})
