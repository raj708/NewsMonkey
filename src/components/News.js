import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };
  static defaultProps = {
    country: 'in',
    category: 'sports',
    pageSize: 8,
    totalResults: 0
  };
  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1

    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
  }
  async updateNews() {
    this.props.setProgress(10);
    fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then((response) => response.json(), this.setState({ loading: true }),this.props.setProgress(30))
      .then((data) => {
        this.props.setProgress(70);
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false
        });
      });
      this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }
  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 })
    fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then((response) => response.json(), this.setState({ loading: true }))
      .then((data) => {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          loading: false
        });
      });

  };

  render() {
    return (
      <>
        <h1 className='mb-3 text-center'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults &&  this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element,index) => {
                return <div className="col-md-4" key={index} >
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.-C1rBK_UqG-p6dsBS1Qd2QHaFH?w=235&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        </>
    )
  }
}
