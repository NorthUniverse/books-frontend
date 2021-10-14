import Link from 'next/Link';

const Pagination = ({ totalItems, isLoading, paginate }) => {
  const pagenumbers = [];

  for (let i = 1; i <= totalItems / 10; i++) {
    pagenumbers.push(i);
    if (i === 10) {
      break;
    }
  }

  if (isLoading) {
    return null;
  } else {
    return (
      <nav>
        <ul className='pagination justify-content-center m-5'>
          {pagenumbers.map((number) => (
            <li key={number} className='page-item'>
              <div
                onClick={() => paginate(number)}
                className='page-link'
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};

export default Pagination;
