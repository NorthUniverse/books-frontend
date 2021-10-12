const BookCard = (props) => {
  return (
    <li className='list-group-item'>
      <h2>{props.book.title}</h2>
      <p>{props.book.authors}</p>
      <p>{props.book.description}</p>
      <a href={props.book.infoLink}>More Info</a>
    </li>
  );
};

export default BookCard;
