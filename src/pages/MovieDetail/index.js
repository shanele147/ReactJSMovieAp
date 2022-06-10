import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieService from "../../services/MovieService";
import { API_KEY, image_url, youtube_url } from "../../constant/const-key";
import "./MovieDetail.css";

const MovieDetail = () => {
  const params = useParams();
  console.log(params);
  const [movieInfo, setMovieInfo] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [isFade, setFadeImage] = useState(true);

  async function fetchMovieDetail() {
    const movieDetail = await MovieService.getMovieDetail(params.id);
    setMovieInfo(movieDetail);
  }

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  console.log(movieInfo);
  const {
    original_title: title,
    backdrop_path,
    poster_path,
    homepage,
    overview,
    release_date,
    imdb_id,
    genres,
    runtime,
    video,
    production_companies,
  } = movieInfo ? movieInfo : undefined;

  // get id of the movie by using params
  async function fetchMovieTrailers() {
    const movieTrailers = await MovieService.getMovieTrailer(params.id);
    setTrailers(movieTrailers);
  }

  useEffect(() => {
    fetchMovieTrailers();
  }, [params.id]);
  //   console.log(trailers);

  const onFadeImage = () => {
    // 👇️ toggle isActive state on click
    setFadeImage(false);
    // setFadeImage((current) => !current);
  };

  const genreList =
    genres && genres.map((genre, index) => <li key={index}>{genre.name}</li>);
  const released =
    release_date && MovieService.convertToHumanDate(release_date);

  const trailer = trailers && trailers.shift();
  trailer && console.log(trailer.name.split('"').join(""));

  return (
    <>
      <div className="container section-wrapper">
        <div className="row">
          <div className="col-5 col-md-6 col-sm-12">
            <div className="hero-img">
              <img
                src={`${image_url}${poster_path}?api_key=${API_KEY}&language=en-US)`}
              ></img>
            </div>
          </div>
          <div className="col-7 col-md-6 col-sm-12 movie-info">
            <h2 className="big-title detail-title">{title}</h2>
            <h4>({released})</h4>
            <ul>{genreList}</ul>
            <div className="detail-overview">
              <p>{overview}</p>
            </div>
            <div className="visit-website">
              <a className="btn-visit-website" href={`${homepage}`}>
                Visit the website
                {/* <button type="button">Visit the website</button> */}
              </a>
            </div>
          </div>
          <div className="col-12 col-md-12 col-sm-12 trailer">
            <div
              className={isFade ? "activePoster" : ""}
              onClick={() => onFadeImage()}
            ></div>
            {trailer && (
              <iframe
                className="youtube-trailer"
                src={`${youtube_url}${trailer.key}`}
                title={`${trailer.name.split('"').join("")}`}
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
