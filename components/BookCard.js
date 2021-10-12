const renderAuthors = (authors) => {
  return (
    <>
      {authors.length === 1 ? (
        <h5>{authors}</h5>
      ) : (
        <>
          {authors.map((author, index) => {
            return <h5>{author}, </h5>;
          })}
        </>
      )}
    </>
  );
};

const BookCard = (props) => {
  return (
    <li className='list-group-item p-5'>
      <h2>{props.book.title}</h2>
      {renderAuthors(props.book.authors)}
      <p>{props.book.description}</p>
      <a href={props.book.infoLink} target='_blank'>
        More Info
      </a>
    </li>
  );
};

export default BookCard;
