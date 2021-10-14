import styles from '../styles/Home.module.css';
import HeadTag from '../components/HeadTag';
import Header from '../components/Header';
import axios from 'axios';
import React, { useState } from 'react';
import BookCards from '../components/BookCards';
import Pagination from '../components/Pagination';

export default function Home() {
  const [book, setBook] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    getResults(1);
  };

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  };

  const paginate = (number) => {
    getResults(number);
  };

  const getResults = async (number) => {
    setCurrentPage(number);
    const DOMAIN = 'http://localhost:8000/';
    const PATH = 'books/search';
    setIsLoading(true);
    const res = await axios.get(`${DOMAIN}${PATH}`, {
      params: {
        searchQuery: book,
        startIndex: number * 10 - 2,
      },
    });
    setResults(res.data.searchedBooks);
    setTotalItems(res.data.totalItems);
    setIsLoading(false);
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

          {results ? <BookCards books={results} isLoading={isLoading} /> : null}

          <Pagination
            totalItems={totalItems}
            isLoading={isLoading}
            paginate={paginate}
            currentPage={currentPage}
          />

          {/* api returns different totalItems
          {totalItems && !isLoading ? (
            <>
              <p className='display-6 text-center'>
                Total search results: {totalItems}
              </p>
            </>
          ) : null} */}
        </main>
      </div>
    </>
  );
}
