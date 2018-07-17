import axios from 'axios';

const ROOT_API = process.env.VUE_APP_ROOT_API;

let api = {

    async getAllBookmarks() {
        let {data} = await axios.get(ROOT_API + '/bookmarks');

        return data;
    },

    async saveBookmark(args) {
        let {data} = await axios.post(ROOT_API + '/bookmark', args);

        return data;
    },

    async login(username, password) {
        let args = {
            grant_type: "password",
            client_id: "1",
            client_secret: "0BsStDc0ZU5A5mXzzsEreh8JK9dbcifHsEt93xPk",
            username: username,
            password: password,
            scope: "*"
        };

        let {data} = await axios.post('http://localhost:7891/oauth/token', args);

        return data;
    }
};

export default api;

