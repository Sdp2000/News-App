import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'


export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews = async () => {

        props.setProgress(10)
        setLoading(true)
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
        props.setProgress(60)
        setArticles(news.data.articles)
        setTotalResults(news.data.totalResults)
        setLoading(false)
        props.setProgress(100)

    }

    useEffect(() => {
        document.title = `News-${props.category}`
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`)
        setPage(page + 1)
        setArticles(articles.concat(news.data.articles))
        setTotalResults(news.data.totalResults)
        setLoading(false)

    };


    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: 90 }}>{`Top Headlines-${props.category}`}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner></Spinner>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};
News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
};

