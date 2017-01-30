import pkgYoutubeUrl from 'youtube-url';


function youtubeUrl(url) {
    let extracted = pkgYoutubeUrl.extractId(url);
    return extracted === false ?
        null : 
        extracted
}

export default youtubeUrl