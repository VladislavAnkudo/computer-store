import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className='home__page-reviews-cover'>
        {reviews.map((review) => (
          <div key={review.id} className='home__page-reviews-cover-full'>
            <div className='home__page-reviews__cover-img' ><img className='home__page-reviews-img' src={process.env.REACT_APP_API_URL + review.img}/></div>
            <div className='home__page-reviews'>
              <div className='home__page-reviews-name'>{review.name}</div>
              <div className='home__page-reviews-description'>{review.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export {ReviewList};