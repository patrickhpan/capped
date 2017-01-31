import React from 'react';
import { Link } from 'react-router';

import { some } from '../js/videoInfo';
import RecentEntry from './RecentEntry';

class Recents extends React.Component {
    constructor() {
        super();
        this.state = {
            recents: []
        }
    }
    componentDidMount() {
        some(24)
            .then(data => {
                this.setState({recents: data})
            })
    }
    render() {
        let recents = this.state.recents.map(recent => {
            return <RecentEntry 
                ytid={recent.ytid}
                title={recent.title}
            />
        })
        return <div className="Recents">
            <h2>Recent Videos</h2>
            <div className="recent-entries">
                {recents}
            </div>
        </div>
    }
}

export default Recents;