import axios from 'axios';

const API_HOST = process.env.VUE_APP_API_HOST;
const ROOT_API = API_HOST + process.env.VUE_APP_API_SUFFIX;


let api = {

    /**
     *
     * @returns {Promise<void>}
     */
    async getUsersCount() {
        let {data} = await axios.get(ROOT_API + '/usersCount');

        return data;
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async getCurrentUser() {
        let {data} = await axios.get(ROOT_API + '/user');

        return data;
    },

    /**
     *
     * @param userId
     * @returns {Promise<void>}
     */
    async getAllBookmarks(userId) {
        let {data} = await axios.get(ROOT_API + '/bookmarks/' + userId);

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
     * Register new user
     *
     * @param args
     * @returns {Promise<any>}
     */
    async register(args) {
        return await axios.post(ROOT_API + '/register', args);
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

        return await axios.post(API_HOST + '/oauth/token', args);
    }

};

export default api;

