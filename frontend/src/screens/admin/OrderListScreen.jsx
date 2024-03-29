import React from 'react';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import { useGetOrdersQuery } from '../../slice/ordersApiSlice';
import { Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Meta from '../../components/Meta';

const OrdersContent = ({ orders }) => {
  if (orders.length === 0) {
    return <Message className={'my-5'}>No Orders.</Message>;
  } else {
    return (
      <>
        <Meta title={'All Orders'} />
        <Table hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
};

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <OrdersContent orders={orders} />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
