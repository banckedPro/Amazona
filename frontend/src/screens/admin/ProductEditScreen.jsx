import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slice/productApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Meta from '../../components/Meta';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const res = await updateProduct(updatedProduct);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success('Product Updated');
      navigate('/admin/productlist');
    }
  };

  return (
    <>
      <Meta title={`Edit Product ${product._id}`} />
      <Link to={'/admin/productlist'} className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {updateProductLoading && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>{error}</Message>
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price" className="my-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose File</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="IMAGE URL"
                  readOnly
                  value={image}
                  className="my-2"
                />
                <Form.Control
                  type="file"
                  placeholder={image}
                  onChange={uploadFileHandler}
                />
              </Form.Group>

              <Form.Group controlId="brand" className="my-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category" className="my-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock" className="my-3">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => {
                    setCountInStock(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description" className="my-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  as={'textarea'}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
