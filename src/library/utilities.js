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
    }

};

export default utilities;