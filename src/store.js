import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '@/api';

export default new Vuex.Store({
    state: {
        username: ''
    },
    mutations: {
        getCurrentUser(state) {
            console.log('run')
            api.getCurrentUser()
                .then(response => {
                    state.username = response.name;
                })
                .catch(error => {
                    if (error.response.statusText === 'Unauthorized') {
                        state.username = '';
                    }
                });
        }
    },
    actions: {
        getCurrentUser (context) {
            context.commit('getCurrentUser');
        }
    }
})
