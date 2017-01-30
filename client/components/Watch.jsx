import React from 'react';
import YouTube from 'react-youtube';

class Watch extends React.Component {
    render() {
        return <div className="Watch">
            {this.props.params.ytid}
        </div>
    }
}

export default Watch;