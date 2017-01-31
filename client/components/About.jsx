import React from 'react';
import { Link } from 'react-router';

class About extends React.Component {
    render() {
        return <div className="About">
            <div className="bigger">Capped is a web tool that adds visual captions to YouTube videos, enriching the experience of viewing a video for all people, especially the visually impaired.</div> 
            

        <div className="bigger">We generate full sentence captions using Microsoft's Cognitive Services Computer Vision API, and use text-to-speech to describe a scene as it appears in the video.</div>
        <div className="smaller">Created during MIT IAP 2017
            
            by <a href="mailto:patrick.pan@patrickpan.com">Patrick Pan</a> & <a href="mailto:apfoerts@wellesley.edu">Anna Pförtsch</a></div>    
            
            { this.props.children }
        </div>            
    }
}

export default About