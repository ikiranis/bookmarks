import axios from 'axios';

const API_HOST = process.env.VUE_APP_API_HOST;
const ROOT_API = API_HOST + process.env.VUE_APP_API_SUFFIX;

let api = {

    /**
     * Test if api works
     *
     * @returns {Promise<void>}
     */
    async getApiWorks() {
        let {data} = await axios.get(ROOT_API + '/apiWorks');

        return data;
    },

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
     * @param page
     * @returns {Promise<void>}
     */
    async getBookmarks(args, page) {
        if (page !== null) {
            page = '?' + page.split('?')[1];
        } else {
            page='';
        }

        let {data} = await axios.get(ROOT_API + '/bookmarks' + page, {params: args} );

        return data;
    },

    /**
     * Get a single bookmark with bookmarkId
     *
     * @param bookmarkId
     * @returns {Promise<void>}
     */
    async getBookmark(bookmarkId) {
        let args = {
            id: bookmarkId
        };

        let {data} = await axios.get(ROOT_API + '/bookmark', {params: args});

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
     * Decrypt and get description of bookmark
     *
     * @param args
     * @returns {Promise<void>}
     */
    async decryptDescription(args) {
        let {data} = await axios.get(ROOT_API + '/decryptDescription', {params: args});

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
     * Toggle public of bookmark with bookmarkId
     *
     * @param bookmarkId
     * @returns {Promise<boolean>}
     */
    async toggleBookmarkPublic(bookmarkId) {
        let {data} = await axios.patch(ROOT_API + '/publicBookmark/' + bookmarkId);

        return data;
    },

    /**
     * Upload a file
     *
     * @param args
     * @returns {Promise<void>}
     */
    async uploadFile(args) {
        let {data} = await axios.post(ROOT_API + '/uploadFile', args);

        return data;
    },

    /**
     * Store file to database
     *
     * @param args
     * @returns {Promise<void>}
     */
    async storeFile(args) {
        let {data} = await axios.post(ROOT_API + '/file', args);

        return data;
    },

    /**
     *
     * @param args
     * @returns {Promise<void>}
     */
    async insertTag(args) {
        let {data} = await axios.post(ROOT_API + '/tag', args);

        return data;
    },

    /**
     * Parse the metadata for url
     *
     * @returns {Promise<void>}
     * @param args
     */
    async getMetadata(args) {
        let {data} = await axios.get(ROOT_API + '/metadata', {params: args} );

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

    async updateUser(args) {
        let {data} = await axios.patch(ROOT_API + '/user', args);

        return data;
    },

    /**
     * Generate and get new user api_key
     *
     * @param {*} id
     */
    async generateApiKey(id) {
        let {data} = await axios.patch(ROOT_API + '/userApiKey/' + id);

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

        return await axios.post(API_HOST + '/oauth/token', args);
    },

    /**
     * Get all tags for userId
     *
     * @param userId
     * @returns {Promise<void>}
     */
    async getTags(userId) {
        let {data} = await axios.get(ROOT_API + '/tags/' + userId);

        return data;
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

    /**
     *
     * @param {*} args
     */
    async removeUserFromGroup(args) {
        return await axios.post(ROOT_API + '/removeGroupUser', args);
    },

    /**
     * Get content of file
     *
     * @param id
     * @returns {Promise<void>}
     */
    async getFile(id) {
        return await axios.get(ROOT_API + '/file/' + id);
    },

    /**
     * Delete a file
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteFile(id) {
        return await axios.delete(ROOT_API + '/file/' + id);
    },

    /**
     * Send email to user with reset token
     *
     * @param args
     * @returns {Promise<any>}
     */
    async sendResetToken(args) {
        return await axios.post(ROOT_API + '/sendResetToken', args);
    },

    /**
     * Reset the password
     *
     * @param args
     * @returns {Promise<any>}
     */
    async resetPassword(args) {
        return await axios.patch(ROOT_API + '/resetPassword', args);
    },

    /**
     *
     * @returns {*}
     */
    rootApi() {
        return ROOT_API;
    }

};

export default api;

