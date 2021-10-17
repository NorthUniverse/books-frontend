import styles from '../styles/Home.module.css';

const Header = () => {
  return (
    <>
      <h1 className={`m-5 text-center ${styles.header}`}>
        Find Your Next Read
      </h1>
      <p className='m-5 text-center'>
        This book search app is powered by Google Books API
      </p>
    </>
  );
};

export default Header;
