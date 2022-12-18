import axios from 'axios';
const bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

export const getBookByTitle = async (title) => {
  try {
    const { data } = await axios.get(bookUrl + title);
    const wishlistData = await localStorage.getItem('wishlists');
    const bookLists = data.items.map((book) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        authors: book.volumeInfo.authors,
        ratings: Math.round(Math.random() * 5),
        isWishlisted: wishlistData.includes(book.id),
      };
    });
    return {
      status: 'success',
      data: bookLists,
    };
  } catch (error) {
    return {
      status: 'error',
      data: [],
    };
  }
};

const getFromLocalStorage = async (key) => {
  try {
    const wishlists = await localStorage.getItem(key);
    if (!wishlists) return [];
    return JSON.parse(wishlists);
  } catch (error) {
    return [];
  }
};
const setToLocalStorage = async (key, value) => {
  try {
    let lastBookMark = await getFromLocalStorage(key);
    const isBookmarked = lastBookMark.find((el) => el === value);
    isBookmarked
      ? (lastBookMark = lastBookMark.filter((el) => el !== value))
      : lastBookMark.push(value);
    localStorage.setItem(key, JSON.stringify(lastBookMark));
  } catch (error) {}
};

export const saveWishlist = async (bookId) => {
  try {
    setToLocalStorage('wishlists', bookId);
  } catch (error) {}
};

export const titleShortener = (title) => {
  return title.split('').splice(0, 25).join('');
};
export const authorJoiner = (authors) => {
  return authors.reduce((cv, av) => cv + `, ${av}`);
};
