import styles from '../styles/Home.module.css';
import HeadTag from '../components/HeadTag';
import Header from '../components/Header';
import axios from 'axios';
import React, { useState } from 'react';
import BookCards from '../components/BookCards';

export default function Home() {
  const [book, setBook] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const DOMAIN = 'http://localhost:8000/';
    const PATH = 'books/search';
    setLoading(true);
    const res = await axios.get(`${DOMAIN}${PATH}`, {
      params: {
        searchQuery: book,
      },
    });
    setResults(res.data.searchedBooks);
    setTotalItems(res.data.totalItems);
    setLoading(false);
  };

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  };

  return (
    <>
      <HeadTag />
      <div className='container'>
        <main className={styles.main1}>
          <Header />

          <form onSubmit={handleSubmit} className='m-5'>
            <div className='form-group shadow-lg'>
              <input
                type='text'
                onChange={handleChange}
                className='form-control form-control-lg'
                placeholder='Search for Books'
                autoComplete='off'
              />
            </div>
            <div className='d-flex justify-content-center'>
              <button type='submit' className='btn btn-secondary m-5'>
                Search
              </button>
            </div>
          </form>

          {results ? <BookCards books={results} loading={loading} /> : null}

          {totalItems && !loading ? (
            <>
              <p className='display-6'>Total search results: {totalItems}</p>
            </>
          ) : null}
        </main>
      </div>
    </>
  );
}

// results.map((searchedBook, index) => {
//   return <BookCard book={searchedBook} key={index} />;
// })
