import React from 'react';
import keydown from 'react-keydown';
import YouTube from 'react-youtube';

import {
    dataExists,
    info
} from '../js/videoInfo';
import formatVideoInfo from '../js/formatVideoInfo';
import keyify from '../js/keyify';

const UPDATE_INTERVAL = 1000;

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

    componentWillUnmount() {
        this.stopLoop();
    }

    renderVideoInfo(sentence, faces) {
        let facesElement = faces.length > 0 ? 
            <div className="faces">
                {keyify(faces.map(face => <h2 tabIndex={999}>{face}</h2>))}
            </div> : 
            null
        return <div className="video-info">
            <h1 className="sentence"></h1>    
            <h1 id="video-sentence" tabIndex={1000}>{sentence}</h1>
            {facesElement}
            <button className="speak" onClick={this.speakDescription.bind(this)}>Speak Description</button>
        </div>
    }


    @keydown(32)
    speakDescription() {
        window.responsiveVoice.speak(this.state.sentence + ". " + this.state.faces.join(". "));
    }

    render() {
        let videoInfo = (this.state.sentence && this.state.faces) ? 
            this.renderVideoInfo(this.state.sentence, this.state.faces) :    
            null    
        
        let onReady = this.onReady.bind(this)
        let onPause = this.onPause.bind(this)
        let onPlay = this.onPlay.bind(this)
        
        return <div className="Watch">
            <div className="player">
                <YouTube 
                    ref={player => { this._player = player } }
                    onReady={onReady}
                    onPause={onPause}
                    onEnd={onPause}
                    onPlay={onPlay}
                    videoId={this.ytid}
                    opts={{ playerVars: { autoplay: 1 } }}
                    />   
                {videoInfo}
            </div>    
             
        </div>
    }
}

export default Watch;