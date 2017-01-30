import React from 'react';
import YouTube from 'react-youtube';

import {
    dataExists,
    info
} from '../js/videoInfo';
import formatVideoInfo from '../js/formatVideoInfo';
import keyify from '../js/keyify';

const UPDATE_INTERVAL = 300;

class Watch extends React.Component {
    constructor() { 
        super();
        this.state = {
            exists: null,
            videoInfo: [],
            videoLoaded: false,
            sentence: null,
            faces: null
        }
        
        this.interval = null;
    }
    
    componentDidMount() {
        this.ytid = this.props.params.ytid;
        dataExists(this.ytid)
            .then(exists=> {
                return exists === true
            })
            .then(exists => {
                if (!exists) {
                    this.setState({
                        exists: false
                    })
                }1
                
                info(this.props.params.ytid)
                    .then(data => {
                        let { videoInfo } = data;
                        if (typeof videoInfo === 'string') {
                            videoInfo = JSON.parse(videoInfo)
                        }
                        this.setState({
                            exists: true,
                            videoInfo: videoInfo
                        })
                    })
        })
    }

    loopFunc() {
        this.getCurrentTime()
            .then(time => {
                let { sentence, faces } = formatVideoInfo(time, this.state.videoInfo)
                this.setState({
                    sentence,
                    faces
                })
            })
    }

    startLoop() {
        clearInterval(this.interval)
        this.interval = setInterval(this.loopFunc.bind(this), UPDATE_INTERVAL)
    }
    
    stopLoop() {
        clearInterval(this.interval)
    }
    
    onReady() {
        this.setState({
            videoLoaded: true
        })
        this.getCurrentTime = this._player.internalPlayer.getCurrentTime;
        this.startLoop();
    }
    
    onPause() {
        this.stopLoop();
    }

    onPlay() {
        this.startLoop();
    }

    renderVideoInfo(sentence, faces) {
        return <div className="video-info">
            <h1>{sentence}</h1>
            <h1>Faces:</h1>
            {keyify(faces.map(face => <h2>{face}</h2>))}
        </div>
    }

    render() {
        let videoInfo = (this.state.sentence && this.state.faces) ? 
            this.renderVideoInfo(this.state.sentence, this.state.faces) :    
            null    
        
        let onReady = this.onReady.bind(this)
        let onPause = this.onPause.bind(this)
        let onPlay = this.onPlay.bind(this)
        
        return <div className="Watch">
            {videoInfo}
            <YouTube 
                ref={player => { this._player = player } }
                onReady={onReady}
                onPause={onPause}
                onEnd={onPause}
                onPlay={onPlay}
                videoId={this.ytid}
                opts={{ playerVars: { autoplay: 1 } }}
            />    
        </div>
    }
}

export default Watch;