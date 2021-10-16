import styles from '../styles/Home.module.css';
import HeadTag from '../components/HeadTag';
import Header from '../components/Header';
import axios from 'axios';
import React, { useState } from 'react';
import BookCards from '../components/BookCards';
import Pagination from '../components/Pagination';
import { Alert } from 'reactstrap';

export default function Home() {
  const [book, setBook] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayError, setDisplayError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [apiError, setApiError] = useState(false);

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
    setApiError(false);
    setIsSubmit(false);
    setDisplayError(false);
    setCurrentPage(number);
    const DOMAIN = 'http://localhost:8000/';
    const PATH = 'books/search';
    if (!book) {
      setDisplayError(true);
    } else {
      setIsSubmit(true);
      setIsLoading(true);
      const res = await axios
        .get(`${DOMAIN}${PATH}`, {
          params: {
            searchQuery: book,
            startIndex: number * 10 - 10,
            //key must be stored as an env variable, using it as is for now
            // key: btoa('books')
          },
        })
        .catch((e) => {
          return e;
        });

      if (!res.toString().includes('Error')) {
        setResults(res.data.searchedBooks);
        setTotalItems(res.data.totalItems);
        setIsLoading(false);
      } else {
        setIsSubmit(false);
        setIsLoading(false);
        setApiError(true);
      }
    }
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

          <Alert
            className='d-flex justify-content-center alert-danger'
            isOpen={displayError}
          >
            Please enter book title to search.
          </Alert>

          {results ? <BookCards books={results} isLoading={isLoading} /> : null}

          {results.length === 0 && isSubmit ? (
            <p className='display-6 text-center'>No Search Results</p>
          ) : null}

          {apiError ? (
            <p className='display-6 text-center'>Api Error, please try again later</p>
          ) : null}

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
