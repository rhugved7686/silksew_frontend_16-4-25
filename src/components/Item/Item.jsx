/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  // Conditional rendering for the old price (if it matches new price, it can be hidden)
  const showOldPrice = props.old_price && props.old_price !== props.new_price;

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img 
          onClick={() => window.scrollTo(0, 0)} 
          src={props.image} 
          alt={`Image of ${props.name}`} 
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">Rs {props.new_price}</div>
        {showOldPrice && (
          <div className="item-price-old">Rs {props.old_price}</div>
        )}
      </div>
    </div>
  );
};

export default Item;
