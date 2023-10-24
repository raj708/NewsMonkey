import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'center-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger" >
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
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
