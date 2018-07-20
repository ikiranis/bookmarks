import axios from "axios";

let user = {

    logout() {
        localStorage.accessToken = '';
        localStorage.tokenType = '';
    },

    sendUserTokenHeader() {
        if(typeof localStorage.accessToken !== 'undefined') {
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['Authorization'] = localStorage.tokenType + " " + localStorage.accessToken;
        }
    }

};

export default user;