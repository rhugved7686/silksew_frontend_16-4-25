/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Item.css";

const Item = (props) => {
  // Conditional rendering for the old price (if it matches new price, it can be hidden)
  const showOldPrice = props.old_price && props.old_price !== props.new_price;

  return (
    <div className="item">
      <img 
          onClick={() => window.scrollTo(0, 0)} 
          src={props.image} 
          alt={`Image of ${props.name}`} 
        />
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new"> {props.new_price}</div>
        {showOldPrice && (
          <div className="item-price-old">{props.old_price}</div>
        )}
      </div>
    </div>
  );
};

export default Item;
