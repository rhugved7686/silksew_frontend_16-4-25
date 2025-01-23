import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import "../Offers/Offers.css";

const SaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('Jan 27, 2025 00:00:00').getTime();

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
    <div>
      {/* Centered Heading */}
      <div className="heading-container flex justify-center items-center mb-6">
        <h1 className="offers-heading text-4xl font-bold" style={{textAlign:'center'}}>
          Exclusive Offers for You
        </h1>
        <div className="gradient-line"></div>
      </div>

      <div className="sale-container flex bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="left-section w-1/2 bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
          <h2 className="text-3xl font-bold mb-4">Hurry up and Get 25% Discount!</h2>
          <div className="deals-section">
            <h3 className="text-xl font-semibold mb-2">Deals Of The Day</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🔥</span>
                Women Collection
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔥</span>
                kid's Trends
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔥</span>
                Men Collection
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section w-1/2 flex flex-col justify-center items-center p-6 bg-gray-50">
          <div className="sale-live-banner mb-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center">
            <Clock className="mr-2" />
            Sale is Live!
          </div>
          <div className="countdown-timer flex space-x-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="timer-box text-center">
                <div className="text-4xl font-bold text-purple-600">{value.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all" style={{backgroundColor:"#453966"}}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleCountdown;
