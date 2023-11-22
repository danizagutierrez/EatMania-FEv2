import { Row, Col, Image } from 'react-bootstrap';
import { IRestaurant } from '../../store/slices/restaurants';
import { FC } from 'react';

interface IRestaurantCardProps {
    r: IRestaurant;
    handleCheckboxChange: (checked: boolean, id: string) => void;
}

const RestaurantCard: FC<IRestaurantCardProps> = ({ r, handleCheckboxChange }) => {
    return (
        <div key={r.restaurantId} className="restaurant-card">
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
                            <b>Phone Number:</b> {r.phoneNumber}
                        </span>
                        <span>
                            <b>Cuisine Type:</b> {r.cuisineType}
                        </span>
                        <span>
                            <b>Rating:</b> {r.rating}
                        </span>
                        <span>
                            <b>Description:</b> {r.description}
                        </span>
                        <span>
                            {/* <a href='r.website'>Website</a> */}
                            <b>Website:</b> {r.website}
                        </span>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default RestaurantCard;
