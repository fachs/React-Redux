import React from 'react';

const YoutubeComponent = (props) => {
    return <div className="youtube-wrapper">
        <div className="img-thumb">
            <p className="time">{props.time}</p>
        </div>
        <p className="title">{props.title}</p>
        <p className="desc">{props.desc}</p>
    </div>
}

YoutubeComponent.defaultProps = {
    time: '00.00',
    title: 'Title Here',
    desc: 'Default Desc'
}

export default YoutubeComponent;