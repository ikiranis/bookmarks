let utilities = {

    /**
     * Remove object from myArray with key value
     *
     * @param myArray
     * @param key
     * @param value
     * @returns {*}
     */
    removeObjFromArray(myArray, key, value) {
        return myArray.filter(obj => (obj[key] !== value) );
    },

    /**
     * Check if html text, really have a text
     * Return true if empty
     *
     * @param htmlText
     * @returns {boolean}
     */
    checkIfHTMLTextIsEmpty(htmlText) {
        let markup = htmlText;
        let parser = new DOMParser();
        let element = parser.parseFromString(markup, "text/html").body.childNodes;

        for(let i=0; i<element.length; i++) {
            if(element[i].innerText !== '' ) {
                return false;
            }
        }

        return true;
    },

    /**
     * Parse a url and get parts of it
     *
     * @param url
     * @returns {HTMLElement}
     *
     * parser.protocol;  => "http:"
     * parser.host;      => "example.com:3000"
     * parser.hostname;  => "example.com"
     * parser.port;      => "3000"
     * parser.pathname;  => "/pathname/"
     * parser.hash;      => "#hash"
     * parser.search;    => "?search=test"
     * parser.origin;    => "http://example.com:3000"
     */
    parse_url(url) {
        let parser = document.createElement('a');
        parser.href = url;

        return parser;
    }

};

export default utilities;