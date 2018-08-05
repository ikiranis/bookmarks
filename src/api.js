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
     * Get all bookmarks for user with userId
     *
     * @param userId
     * @returns {Promise<void>}
     */
    async getAllBookmarks(userId, page) {
        if(page !== null) {
            page = '?' + page.split('?')[1];
        }

        let {data} = await axios.get(ROOT_API + '/bookmarks/' + userId + page);

        return data;
    },

    /**
     * Get a single bookmark with bookmarkId
     *
     * @param bookmarkId
     * @returns {Promise<void>}
     */
    async getBookmark(bookmarkId) {
        let {data} = await axios.get(ROOT_API + '/bookmark/' + bookmarkId);

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
     * @param args
     * @returns {Promise<void>}
     */
    async updateBookmark(args) {
        let {data} = await axios.patch(ROOT_API + '/bookmark', args);

        return data;
    },

    /**
     * Remove bookmark woth bookmarkId
     *
     * @param bookmarkId
     * @returns {Promise<void>}
     */
    async removeBookmark(bookmarkId) {
        return await axios.delete(ROOT_API + '/bookmark/' + bookmarkId);
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
    },

    /**
     * Get all groups for userId
     *
     * @param userId
     * @returns {Promise<void>}
     */
    async getGroups(userId) {
        let {data} = await axios.get(ROOT_API + '/groups/' + userId);

        return data;
    },

    /**
     * Get the group with id
     *
     * @param id
     * @returns {Promise<void>}
     */
    async getGroup(id) {
        let {data} = await axios.get(ROOT_API + '/group/' + id);

        return data;
    },

    /**
     * @param args
     * @returns {Promise<void>}
     */
    async updateGroup(args) {
        let {data} = await axios.patch(ROOT_API + '/group', args);

        return data;
    },

    /**
     * Get all the users for group with id
     *
     * @param id
     * @returns {Promise<void>}
     */
    async getGroupUsers(id) {
        let {data} = await axios.get(ROOT_API + '/groupUsers/' + id);

        return data;
    },

    /**
     *
     * @param args
     * @returns {Promise<void>}
     */
    async saveGroup(args) {
        let {data} = await axios.post(ROOT_API + '/group', args);

        return data;
    },

    /**
     * Remove group with groupId
     *
     * @param groupId
     * @returns {Promise<void>}
     */
    async removeGroup(groupId) {
        return await axios.delete(ROOT_API + '/group/' + groupId);
    },

    /**
     * Insert a user in group
     *
     * @param args
     * @returns {Promise<void>}
     */
    async insertUserInGroup(args) {
        return await axios.post(ROOT_API + '/groupUser', args);
    },

    async removeUserFromGroup(args) {
        return await axios.post(ROOT_API + '/removeGroupUser', args);
    }

};

export default api;

