import { FC } from 'react';
import type { FoodItem } from '../../store/slices/food';
import { Button } from 'react-bootstrap';

//This food card is for the admin page to check on the restaurant's menu

interface FoodCardProps {
    food: FoodItem;
    handleCheckboxChange: (checked: boolean, id: string) => void;
    editFood: (id: number) => void;
}

export const FoodCard: FC<FoodCardProps> = ({ food, editFood, handleCheckboxChange }) => {
    return (
        <div className="d-flex flex-row align-items-center gap-1" style={{ height: '100%' }}>
            <input
                type="checkbox"
                value={food.foodId}
                onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
            />
            <div
                className="box "
                style={{ position: 'relative', marginTop: '0', width: '100%', height: '100%' }}
            >
                <div className="img-box">
                    <img src={`/images/f${food.foodId > 10 ? 1 : food.foodId}.png`} alt="" />
                </div>
                <div className="detail-box">
                    <h5>{food.foodName}</h5>

                    <h6>
                        <span>{food.rating}</span> Stars
                    </h6>
                    {/* <h6>
                        <span>{food.reviews}</span> Reviews
                    </h6> */}
                    <p>{food.description}</p>
                    <p>${food.foodPrice}</p>
                </div>
                <Button
                    onClick={() => {
                        editFood(food.foodId);
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
                    Edit
                </Button>
            </div>
        </div>
    );
};
