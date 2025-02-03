import React from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// Import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero__slider--section">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        speed={800}
        className="hero__slider--inner hero__slider--activation"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="hero__slider--items home1__slider--bg">
            <div className="container-fluid">
              <div className="hero__slider--items__inner">
                <div className="row">
                  <div className="col">
                    <div className="slider__content">
                      <h2 className="slider__content--maintitle h1">
                      Dressing Dreams <br />Stitching Stories
                      </h2>
                      <p className="slider__content--desc desc2 mb-40">
                        Up To 40% Off Final Sale Items. <br />
                        Caught in the Moment!
                      </p>
                      <Link className="primary__btn slider__btn" to="/mens">
                        Show Collection
                        <svg 
                          className="primary__btn--arrow__icon" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.5 12H17.5M17.5 12L12.5 7M17.5 12L12.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="hero__slider--items home1__slider--bg three">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 offset-lg-6">
                  <div className="hero__slider--items__inner">
                    <div className="slider__content">
                      <h2 className="slider__content--maintitle h1">
                      Threads That <br />
                      Define You.
                      </h2>
                      <p className="slider__content--desc desc2 mb-40">
                        Up To 40% Off Final Sale Items. <br />
                        Caught in the Moment!
                      </p>
                      <Link className="primary__btn slider__btn" to="/womens">
                        Show Collection
                        <svg 
                          className="primary__btn--arrow__icon" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.5 12H17.5M17.5 12L12.5 7M17.5 12L12.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
        <div className="hero__slider--items home1__slider--bg two">
            <div className="container-fluid">
              <div className="hero__slider--items__inner">
                <div className="row">
                  <div className="col">
                    <div className="slider__content">
                      <h2 className="slider__content--maintitle h1">
                      Seamless Fashion <br />
                      Tailored for All
                      </h2>
                      <p className="slider__content--desc desc2 mb-40">
                        Up To 40% Off Final Sale Items. <br />
                        Caught in the Moment!
                      </p>
                      <Link className="primary__btn slider__btn" to="/kids">
                        Show Collection
                        <svg 
                          className="primary__btn--arrow__icon" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.5 12H17.5M17.5 12L12.5 7M17.5 12L12.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="swiper__nav--btn swiper-button-next"></div>
      <div className="swiper__nav--btn swiper-button-prev"></div>
    </section>
  );
};

export default Hero;