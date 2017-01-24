function youtubeUrl(url) {
    let match = url.trim().match(/(?:https?\:\/\/)?(?:(?:(?:www\.)?youtube\.com\/watch\?v=)|(?:youtu\.be\/))(\w{11})(?:\??(?:(?:\w+=\w+&?)*)?)/i);
    return match === null ?
        null :
        match[1]
}

export default youtubeUrl