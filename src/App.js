import React, { useState } from 'react';
import './App.css';
import { Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import assets from './assets';
import { getBookByTitle } from './helpers';
import BookCard from './Components/BookCard';

function App() {
  const [bookTitle, setTitle] = useState('');
  const [titleResult, setTitleResult] = useState('');
  const [bookData, setBookList] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    try {
      setLoading(true);
      setBookList([]);
      e.preventDefault();
      const book = await getBookByTitle(bookTitle);
      setTitleResult(bookTitle);
      setBookList(book.data);
      setLoading(false);
    } catch (error) {
      setErrorText('Ooops, bukunya sedang tidak ada.');
      setBookList([]);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  return (
    <div className="container">
      <div className="setupWrapper">
        <h2>Find A Book</h2>
        <form onSubmit={handleOnSubmit}>
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Search by Book Title"
            value={bookTitle}
            onChange={handleSearchChange}
            className="titleInput"
          />
        </form>
      </div>

      {titleResult && (
        <p className="resultWrapper">
          Results for "{titleResult}" : {bookData.length} books
        </p>
      )}
      {bookData.length === 0 && !isLoading && (
        <div className="welcomeWrapper">
          <img
            src={assets.images.book_landing_page}
            alt="book landing page"
            className="landingpageImage"
          />
          <h5 className="welcomeText">
            Welcome to book directory, type your desired title on searhbox above
            and get book lists from your keyword.
          </h5>
        </div>
      )}
      {isLoading && (
        <Spin size="large" className="loadingState" tip="Loading" />
      )}
      <div className="bookResultsWrapper">
        {bookData.length === 0 ? (
          <p>{errorText}</p>
        ) : (
          bookData.map((book) => {
            return <BookCard book={book} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
