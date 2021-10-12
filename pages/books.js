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

  const arr = ['a', 'b', 'b'];

  return (
    <>
      <HeadTag />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to books app</h1>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                onChange={handleChange}
                className='form-control'
                placeholder='Search for Books'
                autoComplete='off'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Search
            </button>
          </form>

          <div className={styles.grid1}>
            {results ? (
              <>
                {results.map((searchedBook, index) => {
                  return <BookCard book={searchedBook} />;
                })}
              </>
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
}
