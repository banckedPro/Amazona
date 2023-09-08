import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useGetTopProductsQuery } from '../slice/productApiSlice';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products, error } = useGetTopProductsQuery();

  return (
    <>
      {error && <Message variant={'danger'}>{error}</Message>}
      {!error && (
        <>
          <h1 className="my-3">Featured Products</h1>
          <Carousel pause="hover" className="bg-primary mb-5">
            {products &&
              products.map((product) => {
                return (
                  <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <Image src={product.image} fluid />
                      <Carousel.Caption className="carousel-caption">
                        <h2>
                          {product.name} ${product.price}
                        </h2>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ProductCarousel;
