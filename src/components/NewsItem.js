import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'87%', zIndex:'1'}}>
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={url} className="btn btn-dark btn-sm">Go somewhere</a>
                    </div>
                </div>

            </div>
        )
    }
}
