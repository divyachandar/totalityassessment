import React from 'react'
import { Button, Form } from "react-bootstrap";
import Rating from './Rating';
import { CartState } from "../context/CartContext";

const Filters = () => {
  const {
    productDispatch,
    productState: { byavailableEMI, sort, byRating },
  } = CartState();

 
  return (
    <div className="filters">
      <span className="title">Filter Property</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Sold Out"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_AVAILABLEEMI",
            })
          }
          checked={byavailableEMI}
            
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
      
    </div>
  );
};

export default Filters;
