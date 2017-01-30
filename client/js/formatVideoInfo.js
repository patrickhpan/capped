function getClosestTimestamp(time, timestamps) {
    if (timestamps[0] > time) {
        return 0;
    }
    for (let i = 1; i < timestamps.length; i++) {
        if (timestamps[i] > time) return i-1;
    }
    return timestamps[timestamps.length - 1]
}

function getSentence(analysis) {
    let text = analysis.data.description.captions[0].text
    return text[0].toUpperCase() + text.slice(1);
}

function getFaces(analysis) {
    let faces = analysis.data.faces;
    if (faces.length === 0) {
        return ['No faces']
    } 
    return faces.map(face => {
        return `${face.gender === 'Male' ? 'Man' : 'Woman'}, age ${face.age}`
    })
}

function formatVideoInfo(time, videoInfo) {
    if (!(videoInfo instanceof Array) || videoInfo.length === 0 || !(typeof time === 'number')) {
        return {
            sentence: 'No image detected',
            faces: ['No faces']
        }
    }
    let timestamps = videoInfo.map(data => data.timestamp);
    let closestTimestamp = getClosestTimestamp(time, timestamps);
    let analysis = videoInfo[closestTimestamp];

    return {
        sentence: getSentence(analysis),
        faces: getFaces(analysis)
    }
}

export default formatVideoInfo;