import axios from 'axios';

const API_HOST = process.env.VUE_APP_API_HOST;
const ROOT_API = API_HOST + '/api';


let api = {

    /**
     *
     * @returns {Promise<void>}
     */
    async getAllBookmarks() {
        let {data} = await axios.get(ROOT_API + '/bookmarks');

        return data;
    },

    /**
     *
     * @param args
     * @returns {Promise<void>}
     */
    async saveBookmark(args) {
        let {data} = await axios.post(ROOT_API + '/bookmark', args);

        return data;
    },

    /**
     *
     * @param username
     * @param password
     * @returns {Promise<void>}
     */
    async login(username, password) {
        let args = {
            grant_type: "password",
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            username: username,
            password: password,
            scope: "*"
        };

        let {data} = await axios.post(API_HOST + '/oauth/token', args);

        return data;
    }
};

export default api;

