const renderAuthors = (authors) => {
  return (
    <>
      {authors ? (
        <>
          <ul>
            {authors.map((author, index) => {
              return (
                <li className='m-3' key={index}>
                  {author}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

const BookCard = ({ books, loading }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <ul className='list-group list-group-flush'>
        {books.map((book, index) => {
          return (
            <li className='list-group-item p-5' key={index}>
              <h2>{book.title}</h2>
              {renderAuthors(book.authors)}
              <p>{book.description}</p>
              <a href={book.infoLink} className='text-primary' target='_blank'>
                Info Link
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default BookCard;
