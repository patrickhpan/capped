function get(ytid) {
    // Get the analyzed data from a saved database entry of a 
    // previous analysis of the specified YouTube video
    // If not present, return null.
    return {};
}

function set(ytid, data) {
    // Save the analyzed data into a database entry corresponding
    // to the YouTube video id (ytid) of the analyzed video

    return;
}

module.exports = {
    get,
    set
}