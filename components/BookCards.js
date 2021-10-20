const renderAuthors = (authors) => {
  return (
    <>
      {authors ? (
        <ul>
          {authors.map((author, index) => {
            return (
              <li className='m-3' key={index}>
                <strong>{author}</strong>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

const BookCards = ({ books, isLoading }) => {
  if (isLoading) {
    return (
      <div className='row'>
        <div className='spinner-border col-md-8 mx-auto' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <ul className='list-group list-group-flush'>
        {books.map((book, index) => {
          return (
            <li className='list-group-item p-5' key={index}>
              <h2>{book.title}</h2>
              {renderAuthors(book.authors)}
              <p>{book.description}</p>
              <a href={book.infoLink} className='text-primary' target='_blank' rel="noreferrer">
                Info Link
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default BookCards;
