import axios from 'axios';

const ROOT_API = process.env.VUE_APP_ROOT_API;

let api = {

    async getAllBookmarks()
    {
        let {data} = await axios.get(ROOT_API + '/bookmarks');

        return data;
    },

    async saveBookmark(args)
    {
        let {data} = await axios.post(ROOT_API + '/bookmark', args);

        return data;
    }
};

export default api;

