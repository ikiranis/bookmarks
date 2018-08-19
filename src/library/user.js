import axios from "axios";

let user = {

    /**
     * Set localStorage token data. User logged in
     *
     * @param access_token
     * @param token_type
     */
    login(access_token, token_type) {
        localStorage.accessToken = access_token;
        localStorage.tokenType = token_type;
    },

    /**
     * Delete the token data, to logout the user
     */
    logout() {
        localStorage.accessToken = null;
        localStorage.tokenType = null;
        this.setUserTokenHeader();
    },

    /**
     * Set authentication token header to axios
     */
    setUserTokenHeader() {
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        if(typeof localStorage.accessToken !== undefined) {
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['Authorization'] = localStorage.tokenType + " " + localStorage.accessToken;
        }
    }

};

export default user;