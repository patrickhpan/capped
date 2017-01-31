import React from 'react';

class RecentEntry extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    getImgSrc(ytid) {
        return `https://img.youtube.com/vi/${ytid}/0.jpg`
    }
    render() {
        let { ytid, title } = this.props;
        let onClick = () => {
            this.context.router.push(`/watch/${ytid}`);
        }
        return <div className="RecentEntry" onClick={onClick}>
            <img src={this.getImgSrc(ytid)} alt={title} />
            <div className="title" tabIndex={50}>{title}</div>
        </div>
    }
}

export default RecentEntry;