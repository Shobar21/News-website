import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'health',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
  }

  async fetchNews(page = 1) {
    this.setState({ loading: true })
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f322555666d4c5085bf25639a37fc8a&page=${page}&pageSize=${this.props.pageSize}`
      let response = await fetch(url)
      let data = await response.json()
      console.log('Country:', this.props.country)
      console.log('Category:', this.props.category)

      if (data.articles) {
        this.setState({
          articles: data.articles,
          loading: false,
          page: page,
          totalResults: data.totalResults || 0,
        })
      } else {
        this.setState({ articles: [], loading: false })
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      this.setState({ articles: [], loading: false })
    }
  }

  componentDidMount() {
    this.fetchNews(1)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      this.fetchNews(1)
    }
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1)
    }
  }

  handleNextClick = () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.fetchNews(this.state.page + 1)
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>
          Top Headlines -{' '}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}
        </h1>

        {this.state.loading ? (
          <h2 className='text-center'>Loading news...</h2>
        ) : this.state.articles.length === 0 ? (
          <h2 className='text-center'>No articles found</h2>
        ) : (
          <div className='row'>
            {this.state.articles.map((article) => (
              <div className='col-md-4' key={article.url}>
                <NewsItem
                  title={
                    article.title ? article.title.slice(0, 73) : 'No Title'
                  }
                  description={
                    article.description
                      ? article.description.slice(0, 96)
                      : 'No Description'
                  }
                  imageUrl={
                    article.urlToImage || 'https://via.placeholder.com/150'
                  }
                  newsUrl={article.url}
                  author={article.author || 'Unknown'}
                  date={new Date(article.publishedAt).toLocaleString()}
                />
              </div>
            ))}
          </div>
        )}

        <div className='container d-flex justify-content-between'>
          <button
            type='button'
            disabled={this.state.page <= 1}
            className='btn btn-primary'
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>

          <button
            type='button'
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className='btn btn-primary'
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}
