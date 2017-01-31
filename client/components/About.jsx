import React from 'react';
import { Link } from 'react-router';

class About extends React.Component {
    render() {
        return <div className="About">
            <div className="bigger">Capped is a web tool that adds visual captions to videos, enriching the experience of viewing a video for all people.</div> 
        <div className="smaller">Created during MIT IAP 2017
            by Patrick Pan & Anna Pförtsch</div>    
            
            
            { this.props.children }
        </div>            
    }
}

export default About