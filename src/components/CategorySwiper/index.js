import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

import "./SwiperSlider.css";
// import required modules
import { Lazy, FreeMode, Pagination, Navigation } from "swiper";
import { API_KEY, image_url } from "../../constant/const-key";

function CategorySwiper(props) {
  const { movieList, onViewMore, movieType } = props;
  movieList && console.log(movieList);
  const filerMovies =
    movieList && movieList.filter((movie) => movie.vote_average > 7);
  const movies = filerMovies.map((movie, index) => {
    const { id, poster_path, title } = movie;
    return (
      <>
        <SwiperSlide key={index}>
          <img
            className="swiper-lazy"
            src={`${image_url}${poster_path}?api_key=${API_KEY}&language=en-US)`}
            alt={title}
            onClick={() => onViewMore(id)}
          ></img>
        </SwiperSlide>
      </>
    );
  });
  return (
    <div className="container-fluid category-swiper">
      <div className="row">
        <div className="col-12 col-md-12 col-sm-12">
          <h1>{movieType.split("_").join(" ").toUpperCase()}</h1>
        </div>
        <div className="col-12 col-md-12 col-sm-12">
          <Swiper
            navigation={true}
            slidesPerView={5}
            slidesPerGroup={4}
            loop={false}
            spaceBetween={30}
            freeMode={true}
            lazy={true}
            pagination={{
              clickable: true,
            }}
            modules={[Lazy, FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            {movies}
            <div className="fadeEnd"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CategorySwiper;
