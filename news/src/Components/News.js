import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 6,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super()
    this.state = {
      article: [], // Initialize as an empty array
      loading: true, // Set loading to true initially
      page: 1,
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec1ed968fee842d2a8e20cc2f871f815&page=1&pageSize=${this.props.pagesize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      article: parsedData.articles,
      loading: false, // Set loading to false after data is fetched
      totalResults: parsedData.totalResults,
    })
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ec1ed968fee842d2a8e20cc2f871f815&page=${
      this.state.page - 1
    }&pageSize=${this.props.pagesize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      article: parsedData.articles,
    })
  }
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pagesize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=ec1ed968fee842d2a8e20cc2f871f815&page=${
        this.state.page + 1
      }&pageSize=${this.props.pagesize}`
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData)
      this.setState({
        page: this.state.page + 1,
        article: parsedData.articles,
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>
          {' '}
          Top Headlines
        </h1>
        <div className='row'>
          {this.state.article.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 73) : ' '}
                  description={
                    element.description ? element.description.slice(0, 96) : ' '
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            )
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            type='button'
            disabled={this.state.page <= 1}
            class='btn btn-primary'
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type='button'
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pagesize)
            }
            class='btn btn-primary'
            onClick={this.handleNextClick}
          >
            Next &larr;
          </button>
        </div>
      </div>
    )
  }
}
