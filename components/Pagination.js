const Pagination = ({ totalItems, isLoading, paginate, currentPage }) => {
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
        <ul className='pagination pagination-lg justify-content-center m-5'>
          {pagenumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};

export default Pagination;
