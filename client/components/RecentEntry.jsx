import React from 'react';

class RecentEntry extends React.Component {
    getImgSrc(ytid) {
        return `https://img.youtube.com/vi/${ytid}/0.jpg`
    }
    render() {
        let { ytid, title } = this.props;
        return <div className="RecentEntry">
            <img src={this.getImgSrc(ytid)} alt={title} />
            <div className="title">{title}</div>
        </div>
    }
}

export default RecentEntry;