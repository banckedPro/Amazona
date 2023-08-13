import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const curTime = new Date(Date.now());
  const curYear = curTime.getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Amazona &copy; {curYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
