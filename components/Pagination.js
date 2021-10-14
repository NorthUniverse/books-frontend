import Link from 'next/Link';

const Pagination = ({ startIndex, totalItems, isLoading, paginate }) => {
  const pagenumbers = [];

  for (let i = 1; i <= totalItems / 10; i++) {
    pagenumbers.push(i);
    if (i === 10) {
      break;
    }
  }

  if (isLoading) {
    console.log(isLoading);
    return null;
  } else {
    return (
      <nav>
        <ul className='pagination justify-content-center m-5'>
          {pagenumbers.map((number) => (
            <li key={number} className='page-item'>
              <Link
                onClick={() => paginate(number)}
                href='/'
                className='page-link'
              >
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};

export default Pagination;
