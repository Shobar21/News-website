import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props
    return (
      <div className='my-3'>
        <div className='card' style={{ width: '18rem' }}>
          <img
            src={
              !imageUrl
                ? 'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_758388_16941616436003239.jpg'
                : imageUrl
            }
            className='card-img-top'
            alt='...'
          />
          <div className='card-body'>
            <h5 className='card-title'>{title}...</h5>
            <p className='card-text'>{description}...</p>
            <p class='card-text'>
              <small class='text-body-secondary'>
                By {!author ? 'Unknown' : author} on{' '}
                {new Date(date).toGMTString()}{' '}
              </small>
            </p>
            <a
              href={newsUrl}
              target='_blank'
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
