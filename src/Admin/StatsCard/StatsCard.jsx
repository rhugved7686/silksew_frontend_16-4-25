import "../StatsCard/StatsCard.css"

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ "--card-color": color }}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default StatsCard

