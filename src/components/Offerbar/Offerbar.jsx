import { useState, useEffect } from "react"
import "../Offerbar/Offerbar.css"

export default function SaleTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 24,
    minutes: 30,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const endDate = new Date("2025-02-28").getTime()
      const now = new Date().getTime()
      const difference = endDate - now

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const announcements = [
    "Special Offer! 🎉",
    "Limited Time Deal ⚡",
    "Don't Miss Out! 🎯",
    "Shop Now! 🛍️",
    "Best Prices Ever! 💫",
  ]

  return (
    <div className="sale-wrapper">
      <div className="sale-container">
        <div className="timer-section">
          <div className="sale-text blink">Sale is Live !!!</div>
          <div className="countdown">
            <div className="time-unit">
              <span className="number">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="label">days</span>
            </div>
            <div className="time-unit">
              <span className="number">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="label">hours</span>
            </div>
            <div className="time-unit">
              <span className="number">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="label">min</span>
            </div>
            <div className="time-unit">
              <span className="number">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="label">sec</span>
            </div>
          </div>
        </div>
        <div className="marquee-section">
          <div className="marquee-content">
            {[...announcements, ...announcements, ...announcements].map((text, index) => (
              <span key={index} className="marquee-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

