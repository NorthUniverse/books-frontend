export default function SearchBar() {
             
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            onChange={handleChange}
            clkassName='input-control'
            placeholder='Search for Books'
            autoComplete='off'
          />
          <button type='submit' className='btn'>
            Search
          </button>
        </div>
      </form>
    </>
  );
}
