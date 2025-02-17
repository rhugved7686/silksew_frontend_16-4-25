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

        /* Mobile styles */
        @media (max-width: 640px) {
          .subcategory-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .subcategory-container::-webkit-scrollbar {
            display: none;
          }

          .subcategory-button {
            padding: 0.5rem 1rem;
            font-size: 0.8125rem;
          }
        }

        /* Desktop styles */
        @media (min-width: 641px) {
          .subcategory-container {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e0 #f3f4f6;
          }

          .subcategory-container::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .subcategory-container::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }

          .subcategory-container::-webkit-scrollbar-thumb {
            background-color: #cbd5e0;
            border-radius: 4px;
            border: 2px solid #f3f4f6;
          }

          .subcategory-container::-webkit-scrollbar-thumb:hover {
            background-color: #a0aec0;
          }
        }
      `}</style>
    </div>
  )
}

export default SubcategorySideBar

