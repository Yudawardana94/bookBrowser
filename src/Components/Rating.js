import React from 'react';
import './Rating.css';
import { StarFilled } from '@ant-design/icons';
function Rating({ rating }) {
  const ratingArr = Array(5).fill('r');
  return (
    <div className="starWrapper">
      {ratingArr.map((_, idx) => (
        <StarFilled
          key={Math.random() * 10 + idx}
          style={{
            marginTop: '2vh',
            marginBottom: '1vh',
            fontSize: 18,
            color: idx > rating ? 'graytext' : 'yellow',
          }}
        />
      ))}
    </div>
  );
}

export default Rating;
