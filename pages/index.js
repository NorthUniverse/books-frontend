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
  const [noAuthDisplay, setNoAuthDisplay] = useState(false);

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

  // https://www.geeksforgeeks.org/node-js-crypto-createdecipheriv-method/
  const encryptData = (secretMessage) => {
    // Includes crypto module
    const crypto = require('crypto');
    // Difining algorithm
    const algorithm = 'aes-256-cbc';
    // Defining key
    const key = crypto.randomBytes(32);
    // Defining iv
    const iv = crypto.randomBytes(16);
    // An encrypt function
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    // Updating secretMessage
    let encrypted = cipher.update(secretMessage);
    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Returning algorithm, key, iv and encrypted data
    return {
      algorithm,
      key,
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  };

  const getResults = async (number) => {
    setInitStates(number);

    // const DOMAIN = 'https://books-api.northuniverse.repl.co';
    const DOMAIN = 'http://3.82.199.46';
    const PATH = '/books/search';
    //secretKey must be stored as an environment variable, hard coding it for now
    const secretMessage = 'purpleHippo';

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
            encryptedData: encryptData(secretMessage),
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        })
        .catch((e) => {
          return e;
        });

      const isError = getError(res);
      let isAuth = getAuth(res);
      setErrorAuthStates(res, isError, isAuth);
    }
  };

  const setErrorAuthStates = (res, isError, isAuth) => {
    if (isError) {
      setIsSubmit(false);
      setIsLoading(false);
      setApiError(true);
    } else if (!isAuth) {
      setIsSubmit(false);
      setIsLoading(false);
      setNoAuthDisplay(true);
    } else {
      setResults(res.data.searchedBooks);
      setTotalItems(res.data.totalItems);
      setIsLoading(false);
    }
  };

  const setInitStates = (number) => {
    setApiError(false);
    setIsSubmit(false);
    setDisplayError(false);
    setCurrentPage(number);
  };

  const getError = (res) => {
    return (
      res.toString().includes('Error') || res.toString().includes('TypeError')
    );
  };

  const getAuth = (res) => {
    try {
      return res.data.auth;
    } catch (e) {
      console.log(e);
      return false;
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
            Please enter text to search.
          </Alert>

          {results ? <BookCards books={results} isLoading={isLoading} /> : null}

          {results.length === 0 && isSubmit && !isLoading ? (
            <p className='display-6 text-center'>No Search Results</p>
          ) : null}

          {apiError ? (
            <p className='display-6 text-center'>
              An error occurred, please try again later
            </p>
          ) : null}

          {noAuthDisplay ? (
            <p className='display-6 text-center'>Not Authorized</p>
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

          {/* Another know issue https://github.com/reactstrap/reactstrap/issues/1340 */}
        </main>
      </div>
    </>
  );
}
