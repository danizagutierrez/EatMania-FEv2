import { Row, Col, Image, Button } from 'react-bootstrap';
import { IRestaurant } from '../../store/slices/restaurants';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IRestaurantCardProps {
    r: IRestaurant;
    handleCheckboxChange: (checked: boolean, id: string) => void;
    editRestaurant: (id?: number) => void;
}

const RestaurantCard: FC<IRestaurantCardProps> = ({ r, handleCheckboxChange, editRestaurant }) => {
    const navigate = useNavigate();

    return (
        <div className="restaurant-card">
            <input
                type="checkbox"
                value={r.restaurantId}
                onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
            />
            <div className="borderWithText" data-text={r.name}>
                <Row>
                    <Col xs={12} sm={4} md={3} lg={3} className="d-flex align-items-center">
                        <Image src={r.image} rounded style={{ width: '150px', height: '150px' }} />
                    </Col>
                    <Col
                        xs={12}
                        sm={8}
                        md={3}
                        lg={9}
                        className="d-flex flex-column justify-content-center gap-2"
                    >
                        <span>
                            <b>Name:</b> {r.name}
                        </span>
                        <span>
                            <b>Cuisine Type:</b> {r.cuisineType}
                        </span>
                        <span>
                            <b>Phone Number:</b> {r.phoneNumber}
                        </span>
                        <span>
                            <b>Description:</b> {r.description}
                        </span>
                        <span>
                            <b>Rating:</b> {r.rating}
                        </span>
                        <span className="d-flex justify-content-between">
                            <Button
                                onClick={() => {
                                    editRestaurant(r.restaurantId);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate('/restaurant/' + r.restaurantId);
                                }}
                            >
                                Manage Menu
                            </Button>
                        </span>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RestaurantCard;
