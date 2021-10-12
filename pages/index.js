import styles from '../styles/Home.module.css';
import HeadTag from '../components/HeadTag';
import axios from 'axios';
import { useState } from 'react';
import BookCard from '../components/BookCard';

export default function Home() {
  const [book, setBook] = useState('');
  const [results, setResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(book);
    const DOMAIN = 'http://localhost:8000/';
    const PATH = 'books/search';
    axios
      .get(`${DOMAIN}${PATH}`, {
        params: {
          searchQuery: book,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResults(res.data.searchedBooks);
        setTotalItems(res.data.totalItems);
      });
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
          <h1 className='m-5 text-center'>
            Welcome to Dennis's world famous books search app
          </h1>
          <p className='m-5 text-center'>
            This App connects to google API in searching for book entered and
            displays the result
          </p>

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

          <ul className='list-group list-group-flush'>
            {results ? (
              <>
                {results.map((searchedBook, index) => {
                  return <BookCard book={searchedBook} />;
                })}
              </>
            ) : null}
          </ul>
        </main>
      </div>
    </>
  );
}
