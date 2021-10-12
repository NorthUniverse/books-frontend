const BookCard = (props) => {
  return (
    <div className='book-card'>
      <h2>{props.book.title}</h2>
      <p>{props.book.authors}</p>
      <p>{props.book.description}</p>
      <p>{props.book.infoLink}</p>
    </div>
  );
};

export default BookCard;
