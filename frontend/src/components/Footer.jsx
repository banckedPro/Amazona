import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const curTime = new Date(Date.now());
  const curYear = curTime.getFullYear();

  return (
    <footer className="py-1">
      <Container>
        <Row>
          <Col className="text-center">
            <p>Amazona &copy; {curYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
