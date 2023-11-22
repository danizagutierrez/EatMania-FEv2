import { Row, Col, Image } from 'react-bootstrap';
import { IUser } from '../../store/slices/auth';
import { FC } from 'react';

interface ICustomerCardProps {
    r: IUser;
    handleCheckboxChange: (checked: boolean, id: string) => void;
}

const CustomerCard: FC<ICustomerCardProps> = ({ r, handleCheckboxChange }) => {
    return (
        <div key={r.id} className="restaurant-card">
            <input
                type="checkbox"
                value={r.id}
                onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
            />
            <div className="borderWithText" data-text={r.name}>
                <Row>
                    <Col xs={12} sm={4} md={3} lg={3} className="d-flex align-items-center">
                        <Image
                            src="/images/client1.jpg"
                            style={{ width: '150px', height: '150px' }}
                            rounded
                        />
                        {/* <Image src={r.image} rounded /> */}
                    </Col>
                    <Col
                        xs={12}
                        sm={8}
                        md={9}
                        lg={9}
                        className="d-flex flex-column justify-content-center gap-2"
                    >
                        <span>Name: {r.name}</span>
                        <span>Location: {r.location}</span>
                        <span>Subscription: {r.subscription}</span>
                        <span>Next Renewal: {r.next_renewal}</span>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CustomerCard;
