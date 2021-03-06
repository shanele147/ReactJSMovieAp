import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../../components/HeroSlider";
import Loader from "../../components/Loader";
import MovieService from "../../services/MovieService";
import {
  MOVIE_UPCOMING,
  MOVIE_TOP_RATED,
  MOVIE_POPULAR,
  MOVIE_NOW_PLAYING,
} from "../../services/MovieService";
import CategorySwiper from "../../components/CategorySwiper";
import "./HomePage.css";

const HomePage = (props) => {
  const { onGetWishList } = props;
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  // const [idList, setIdList] = useState([]);
  // const [posterPaths, setPosterPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  /* const onViewMore = (movieType, id) => {
    navigation(`/movie/${movieType}/${id}`);
  }; */

  const onViewMore = (id) => {
    navigation(`/movies/${id}`);
  };

  async function fetchData() {
    setLoading(true);
    const moviePopular = await MovieService.getMovieByType(MOVIE_POPULAR);
    const movieUpcoming = await MovieService.getMovieByType(MOVIE_UPCOMING);
    const movieTopRated = await MovieService.getMovieByType(MOVIE_TOP_RATED);
    const movieNowPlaying = await MovieService.getMovieByType(
      MOVIE_NOW_PLAYING
    );

    setPopularMovies(moviePopular);
    setUpcomingMovies(movieUpcoming);
    setTopRatedMovies(movieTopRated);
    setNowPlaying(movieNowPlaying);

    setLoading(false);
    /* setTimeout(() => {
      setLoading(false);
    }, 2000); */
  }

  // call API
  useEffect(() => {
    fetchData();
  }, []);
  console.log("Loading is: " + loading);

  return (
    <div>
      {/* render with condition. Only rendering when the data is ready */}
      {/* render multi child components with only one condition */}
      {loading === true ? (
        <Loader />
      ) : (
        [
<<<<<<< HEAD
          <HeroSlider
            nowPlaying={nowPlaying}
            onViewMore={onViewMore}
            key={MOVIE_NOW_PLAYING}
          />,
=======
            <HeroSlider nowPlaying={nowPlaying} onViewMore={onViewMore} key={ MOVIE_NOW_PLAYING}/>,
>>>>>>> 1a52970503ca082c9a64979c439b3b84bbfab033
          <CategorySwiper
            key={MOVIE_UPCOMING}
            movieList={upcomingMovies}
            onViewMore={onViewMore}
            movieType={MOVIE_UPCOMING}
            onGetWishList={onGetWishList}
          />,
          <CategorySwiper
            key={MOVIE_POPULAR}
            movieList={popularMovies}
            onViewMore={onViewMore}
            movieType={MOVIE_POPULAR}
            onGetWishList={onGetWishList}
          />,
          <CategorySwiper
            key={MOVIE_TOP_RATED}
            movieList={topRatedMovies}
            onViewMore={onViewMore}
            movieType={MOVIE_TOP_RATED}
            onGetWishList={onGetWishList}
          />,
        ]
      )}
    </div>
  );
};

export default HomePage;
