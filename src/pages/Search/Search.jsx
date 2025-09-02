import React from 'react';
import styles from './Search.module.css';
import ContentSlider from '../../common/ContentSlider/ContentSlider';
import { useLocation } from 'react-router-dom';
import { useSearchMovies } from '../../hooks/movie/useSearchMovies';

const Search = () => {
  const location = useLocation();
  const query = location.state?.query || '';
  const { data } = useSearchMovies(query);
  return (
    <div className={styles.searchWrap}>
      {data?.results?.map((item, idx) => (
        <ContentSlider
          key={idx}
          title={item.title}
          data={item.data}
          isTopRank={item.isTopRank}
          kind="movie"
        />
      ))}
    </div>
  );
};

export default Search;
