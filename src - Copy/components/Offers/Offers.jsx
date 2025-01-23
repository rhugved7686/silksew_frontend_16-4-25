import React, { useState, useEffect } from 'react';
import './Offers.css';

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('Jan 25, 2025 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="deals__banner--section section--padding pt-0">
      <div className="container-fluid">
        <div className="deals__banner--inner banner__bg">
          <div className="deals-wrapper">
            <div className="row align-items-center">
              {/* Left content column */}
              <div className="col-lg-6">
                <div className="deals__banner--content position__relative">
                  <span className="deals__banner--content__subtitle text__secondary">
                    Hurry up and Get 25% Discount
                  </span>
                  <h2 className="deals__banner--content__maintitle">
                    Deals Of The Day
                  </h2>
                  <a className="primary__btn" href="shop.html" style={{backgroundColor:"#2C3E50"}}>
                    Show Collection
                    <svg
                      className="primary__btn--arrow__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.2"
                      height="12.2"
                      viewBox="0 0 6.2 6.2"
                    >
                      <path
                        d="M7.1,4l-.546.546L8.716,6.713H4v.775H8.716L6.554,9.654,7.1,10.2,9.233,8.067,10.2,7.1Z"
                        transform="translate(-4 -4)"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right countdown column */}
              <div className="col-lg-6">
                <div className="deals__banner--countdown d-flex flex-column justify-content-center align-items-center">
                  <h2 className="sale-live-text">Sale Live Now</h2>
                  <div className="countdown-container">
                    <div className="countdown__item">
                      <span className="countdown__number">{timeLeft.days}</span><br/>
                      <span className="countdown__text" style={{color:'#C0392B'}}>Days</span>
                    </div>
                    <div className="countdown__item">
                      <span className="countdown__number">{timeLeft.hours}</span><br/>
                      <span className="countdown__text" style={{color:'#C0392B'}}>Hours</span>
                    </div>
                    <div className="countdown__item">
                      <span className="countdown__number">{timeLeft.minutes}</span><br/>
                      <span className="countdown__text" style={{color:'#C0392B'}}>Minutes</span>
                    </div>
                    <div className="countdown__item">
                      <span className="countdown__number">{timeLeft.seconds}</span><br/>
                      <span className="countdown__text" style={{color:'#C0392B'}}>Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
