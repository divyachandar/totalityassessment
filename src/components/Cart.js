import React from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/CartContext";
import Rating from "./Rating";
import { useEffect, useState } from "react";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="propertyContainer">
        <ListGroup>
          {cart.map((eachProperty) => (
            <ListGroup.Item key={eachProperty.id}>
              <Row>
                <Col md={2}>
                  <Image src={eachProperty.image} alt={eachProperty.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{eachProperty.city}</span>
                </Col>
                <Col md={2}>₹ {eachProperty.price}</Col>
                <Col md={2}>
                  <Rating rating={eachProperty.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={eachProperty.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: eachProperty.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(eachProperty.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: eachProperty,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;