let utility = {

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
    }

};

export default utility;