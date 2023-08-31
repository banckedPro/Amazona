import { Col, Container, Row } from 'react-bootstrap';
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12} lg={7}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
