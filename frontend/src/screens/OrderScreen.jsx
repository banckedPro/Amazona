import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailQuery } from '../slice/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={'danger'}>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1 className="my-3">Shipping</h1>
              <p>
                <strong>Name :</strong> {order.user.name}
              </p>

              <p>
                <strong>Email :</strong> {order.user.email}
              </p>

              <p>
                <strong>Address :</strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant={'success'}>Delivered</Message>
              ) : (
                <Message variant={'danger'}>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Payment Method :</strong> {order.paymentMethod}
                {order.isPaid ? (
                  <Message variant={'success'}>Paid</Message>
                ) : (
                  <Message variant={'danger'}>Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.map((item, index) => {
                return (
                  <ListGroup.Item>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={7}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col>
                        {item.qty} x {item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
