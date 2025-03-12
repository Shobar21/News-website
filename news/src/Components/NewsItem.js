import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props
    return (
      <div className='my-3'>
        <div className='card news-card'>
          <img
            src={
              imageUrl && imageUrl.trim() !== ''
                ? imageUrl
                : 'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_758388_16941616436003239.jpg'
            }
            className='card-img-top news-image'
            alt='News'
          />
          <div className='card-body news-content'>
            <h5 className='card-title'>{title}...</h5>
            <p className='card-text'>{description}...</p>
            <p className='card-text'>
              <small className='text-body-secondary'>
                By {author ? author : 'Unknown'} on{' '}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-sm btn-primary'
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    )
  }
}
