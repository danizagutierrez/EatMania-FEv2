import { Row, Col, Image, Button } from 'react-bootstrap';
import { IUser } from '../../store/slices/auth';
import { FC } from 'react';

interface ICustomerCardProps {
    r: IUser;
    handleCheckboxChange: (checked: boolean, id: string) => void;
    editCustomer: (id?: number) => void;
}

const CustomerCard: FC<ICustomerCardProps> = ({ r, handleCheckboxChange, editCustomer }) => {
    return (
        <div key={r.user_id} className="restaurant-card">
            <input
                type="checkbox"
                value={r.user_id}
                onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
            />
            <div className="borderWithText" data-text={r.user_firstname + ' ' + r.user_lastname}>
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
                        <span>Name: {r.user_firstname + ' ' + r.user_lastname}</span>
                        <span>Location: {r.user_address}</span>
                        <span>Subscription: {r.subscription}</span>
                        <span>Next Renewal: {r.next_renewal}</span>
                        <Button
                            onClick={() => {
                                editCustomer(r.user_id);
                            }}
                            style={{ width: '100px' }}
                        >
                            Edit
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CustomerCard;
