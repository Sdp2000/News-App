import React from 'react'

export default function NewsItem(props) {
    return (
        <div className="my-3">
            <div className="card">
                <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                    <span className="badge rounded-pill bg-dark">
                        {props.source}
                    </span>
                </div>
                <img src={props.imageUrl ? props.imageUrl : "https://static9.depositphotos.com/1011646/1236/i/600/depositphotos_12369509-stock-photo-breaking-news-screen.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}...</h5>
                    <p className="card-text">{props.description}...</p>
                    <p className="card-text"><small className="text-muted">By {props.author ? props.author : "Unknown"} on {new Date(props.time).toGMTString()}</small></p>
                    <a rel="noreferrer" href={props.newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}


