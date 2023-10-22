import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };
  static defaultProps = {
    country: 'in',
    category: 'sports',
    pageSize: 8
  };
  capitalize=(s)=>{
    return s[0].toUpperCase() + s.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1

    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonkey`
  }
  async updateNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0234bb6484c42eb8df4785cf091a87c&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then((response) => response.json(), this.setState({ loading: true }))
      .then((data) => {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false
        });
      });
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePreClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }
  render() {
    return (
      <div className='container my-3' >
        <h1 className='mb-3 text-center'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.-C1rBK_UqG-p6dsBS1Qd2QHaFH?w=235&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr;Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}
