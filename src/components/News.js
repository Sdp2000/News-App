import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import axios from 'axios'


export class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=897cea6526ba4e70a72886b184c1f4b1&page=1&pageSize=${this.props.pageSize}`)
        this.setState({
            articles: news.data.articles,
            totalResults: news.data.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        this.setState({ loading: true });
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=897cea6526ba4e70a72886b184c1f4b1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
        this.setState({
            page: this.state.page - 1,
            articles: news.data.articles,
            loading: false
        })

    }

    handleNextClick = async () => {
        this.setState({ loading: true });
        let news = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=897cea6526ba4e70a72886b184c1f4b1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`)
        this.setState({
            page: this.state.page + 1,
            articles: news.data.articles,
            loading: false
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>Top headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News