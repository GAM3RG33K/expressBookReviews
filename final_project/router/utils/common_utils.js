function isEmpty(obj) {
    if (obj == null) return true;

    // Check for arrays
    if (Array.isArray(obj)) return obj.length === 0;

    // Check for objects
    return Object.keys(obj).length === 0;
}


module.exports = {
    isEmpty
};
