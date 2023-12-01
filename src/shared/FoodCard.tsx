import { FC } from 'react';
import type { FoodItem } from '../store/slices/food';
import { ReactComponent as AddOrder } from '../assets/icons/AddOrder.svg';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FoodCardProps {
    food: FoodItem;
    addReview: (id: number) => void;
}

export const FoodCard: FC<FoodCardProps> = ({ food, addReview }) => {
    return (
        <div className="box " style={{ position: 'relative' }}>
            <div className="img-box">
                <img src={`/images/f${food.foodId > 10 ? 1 : food.foodId}.png`} alt="" />
            </div>
            <div className="detail-box">
                <h5>{food.foodName}</h5>
                {/* <h6>
                    <span>{food.reviews}</span> Reviews
                </h6> */}
                <p>{food.description}</p>
                <p>${food.foodPrice}</p>
                <p className="order">
                    <button onClick={() => { window.location.href='https://www.ubereats.com' }}>
                        Order1 
                        <AddOrder />
                    </button>
                    <button onClick={() => { window.location.href='https://www.doordash.com' }}>
                        Order2
                        <AddOrder />
                    </button>
                </p>
            </div>
            <Button
                onClick={() => {
                    addReview(food.foodId);
                }}
                style={{
                    width: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: '5px',
                    top: '5px'
                }}
                variant="success"
            >
                Review&nbsp;
                <FontAwesomeIcon icon={faStar} />
            </Button>
        </div>
    );
};
