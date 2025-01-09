import React, { useEffect, useState } from "react";
import "./OfferBanner.css";

const OfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate the target time 12 hours from the current time
    const calculateTargetTime = () =>
      new Date().getTime() + 12 * 60 * 60 * 1000;
    let targetTime = calculateTargetTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        // Reset target time when countdown reaches zero
        targetTime = calculateTargetTime();
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="offer-banner">
      <div className="offer-content">
        <p>FLAT 50% OFF - HURRY, OFFER ENDS IN:</p>
        <div className="offer-timer">
          <span>{timeLeft.hours} hrs</span>
          <span>{timeLeft.minutes} mins</span>
          <span>{timeLeft.seconds} secs</span>
        </div>
      </div>
      <div className="scrolling-banner-container">
        <div className="scrolling-banner">
          <span>
            👜✨ FLAT 50% OFF on All Products! Limited Time Offer - 12 Hours
            Left! ✨👜
          </span>
          <span>🛍️💎 Free Shipping on Orders Over $50! Shop Now 💎🛍️</span>
          <span>🎁🛒 Grab the Deal Before It's Gone! 🛒🎁</span>
          <span>🛍️🌟 Shop Your Favorites Today! 🌟🛍️</span>
          <span>👜🔥 Exclusive Discounts Await! 🔥👜</span>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
