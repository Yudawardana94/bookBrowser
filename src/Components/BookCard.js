import React, { useState } from 'react';
import './Book.css';
import { HeartFilled } from '@ant-design/icons';

import { titleShortener, authorJoiner, saveWishlist } from '../helpers';

import StarRating from './Rating';
function BookCard(props) {
  const { title, authors, image, ratings, id, isWishlisted } = props.book;
  const [wishlistData, setWishlistData] = useState(isWishlisted);

  const handleWishlist = () => {
    saveWishlist(id);
    setWishlistData((isW) => !isW);
  };
  return (
    <div className="bookWrapper">
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <HeartFilled
          onClick={handleWishlist}
          twoToneColor="#eb2f96"
          style={{
            fontSize: '32px',
            position: 'absolute',
            right: 10,
            top: 10,
            color: wishlistData ? '#eb2f96' : 'lightgrey',
          }}
        />
      </div>
      <img src={image} className="bookImage" alt={title} />
      <div className="description">
        <h3 className="m0 bookTitle">{titleShortener(title)}</h3>
        <div>
          <StarRating rating={ratings} />
          {authors && <p className="m0 bookAuthors">{authorJoiner(authors)}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
