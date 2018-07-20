let user = {

    logout() {
        localStorage.accessToken = '';
        localStorage.tokenType = '';
    }

};

export default user;