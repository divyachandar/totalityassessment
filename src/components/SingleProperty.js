import React from 'react';
import { Card,Button } from "react-bootstrap";
import './styles.css';
import Rating from './Rating';
import { CartState } from "../context/CartContext";

const SingleProperty = ({ PropertyDetails }) => {
  const { state: { cart }, dispatch, } = CartState();
  
  return (
    <div className="property">
      <Card>
        <Card.Img variant="top" src={PropertyDetails.image} alt={PropertyDetails.buildingNumber}/>       
         <Card.Body>
          <Card.Title><span>Building Number:{PropertyDetails.buildingNumber}</span></Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}><span>Located in :{PropertyDetails.city}</span></Card.Subtitle>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {PropertyDetails.price.split(".")[0]} Lakhs</span>
            {PropertyDetails.availableEMI ? (
              <div>EMI AVAILABLE</div>
            ) : (
              <div>MORTAGIZED PROPERTY</div>
            )}
            <Rating rating={PropertyDetails.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === PropertyDetails.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload:PropertyDetails,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload:PropertyDetails,
                })
              }
              disabled={!PropertyDetails.availableEMI}
            >
              {!PropertyDetails.availableEMI? "Sold Out" : "Book Now"}
            </Button>
          )}
                 
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleProperty
