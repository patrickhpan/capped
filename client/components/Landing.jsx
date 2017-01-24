import React from 'react';

import Body from './Body';

class Landing extends React.Component {
    render() {
        let { children } = this.props;
        return <div className="Landing">
            <Body />
            { children }
        </div>
    }
}

export default Landing;

