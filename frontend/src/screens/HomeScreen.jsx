import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

import { useGetProductsQuery } from '../slice/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => {
              return (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="my-3"
                  key={product._id}
                >
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>

          <Row className="my-5">
            <Col md={12} className="d-flex justify-content-center my-5">
              <Paginate page={data.page} pages={data.pages} keyword={keyword} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
