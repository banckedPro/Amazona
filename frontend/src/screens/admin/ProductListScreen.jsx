import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../slice/productApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(productId);
        toast.success('Deleted Successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreateProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Link to={`/product/${product._id}`}> {product._id}</Link>
                  </td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
