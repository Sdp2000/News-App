import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'


export class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `News-${this.props.category}`
    }

    updateNews = async () => {

        this.props.setProgress(10)
        this.setState({ loading: true });
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=897cea6526ba4e70a72886b184c1f4b1&page=${this.state.page}&pageSize=${this.props.pageSize}`)
        this.props.setProgress(60)
        this.setState({
            articles: news.data.articles,
            totalResults: news.data.totalResults,
            loading: false
        })
        this.props.setProgress(100)

    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 })
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=897cea6526ba4e70a72886b184c1f4b1&page=${this.state.page}&pageSize=${this.props.pageSize}`)
        this.setState({
            articles: this.state.articles.concat(news.data.articles),
            totalResults: news.data.totalResults,
            loading: false
        })

    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>{`Top Headlines-${this.props.category}`}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner></Spinner>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
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
}

export default News