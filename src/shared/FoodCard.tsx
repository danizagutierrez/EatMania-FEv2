import { FC } from 'react';
import type { FoodItem } from '../store/slices/food';
// import { ReactComponent as AddOrder } from '../assets/icons/AddOrder.svg';

interface FoodCardProps {
    food: FoodItem;
}

export const FoodCard: FC<FoodCardProps> = ({ food }) => {
    return (
        <div className="box ">
            <div className="img-box">
                <img src={food.image} alt="" />
            </div>
            <div className="detail-box">
                <h5>{food.foodName}</h5>
                <h6>
                    <span>{food.rating}</span> Stars
                </h6>
                <p>{food.description}</p>
                <p>${food.foodPrice}</p>
                <p className="order">
                    <button>
                        Uber eats
                        {/* <AddOrder /> */}
                    </button>
                    <button>
                        Door Dash
                        {/* <AddOrder /> */}
                    </button>
                </p>
            </div>
        </div>
    );
};
