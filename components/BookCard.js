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

const BookCard = (props) => {
  return (
    <li className='list-group-item p-5' key={props.book.id}>
      <h2>{props.book.title}</h2>
      {renderAuthors(props.book.authors)}
      <p>{props.book.description}</p>
      <a href={props.book.infoLink} className='text-primary' target='_blank'>
        Info Link
      </a>
    </li>
  );
};

export default BookCard;
