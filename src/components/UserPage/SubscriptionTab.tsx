import { Col, Container, Row, Button, Image } from 'react-bootstrap';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { RootState } from '../../store/store';

const SubscriptionTab = () => {
    // const user = useAppSelector((state: RootState) => state.auth.user);

    return (
        <>
            <h1 className="mb-5">Subscription</h1>
            <Container>
                <Row>
                    <Col md={12} lg={6}>
                        <b>Current Subscription Type:</b>
                        <p className="ms-3">Monthly</p>
                        <b>Next Renewal Date</b>
                        <p className="ms-3">01/01/2024</p>

                        <Button
                            className="mb-3"
                            variant="outline-success"
                            onClick={() => {
                                console.log('Clicked!');
                            }}
                        >
                            Click to pay Subscription
                        </Button>
                        <br />
                        <sub>**We sue Paypal to secure your transaction</sub>
                    </Col>
                    <Col md={12} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="/images/client1.jpg" thumbnail />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SubscriptionTab;
