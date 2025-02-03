const SubcategorySideBar = ({ subcategories, onSubcategoryClick, selectedSubcategory }) => {
  return (
    <div className="subcategory-container">
      <div className="subcategory-list">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory}
            className={`subcategory-button ${selectedSubcategory === subcategory ? "active" : ""}`}
            onClick={() => onSubcategoryClick(subcategory)}
          >
            {subcategory}
          </button>
        ))}
      </div>

      <style jsx>{`
        .subcategory-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-bottom: 2rem;
          padding: 0.5rem;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .subcategory-container::-webkit-scrollbar {
          display: none; /* WebKit */
        }

        .subcategory-list {
          display: flex;
          gap: 0.75rem;
          padding: 0.25rem;
          min-width: min-content;
        }

        .subcategory-button {
          padding: 0.625rem 1.25rem;
          border-radius: 9999px;
          border: none;
          background-color: #f3f4f6;
          color: #374151;
          font-size: 0.9375rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .subcategory-button:hover {
          background-color: #e5e7eb;
          transform: translateY(-1px);
        }

        .subcategory-button.active {
          background-color: #2563eb;
          color: white;
          box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
        }

        .subcategory-button:active {
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .subcategory-button {
            padding: 0.5rem 1rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  )
}

export default SubcategorySideBar

