import { ButtonGroup, Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { deleteRestaurants, fetchRestaurant, removeRestaurant } from '../../store/slices/restaurants';
import RestaurantCard from './RestaurantCard';

const RestaurantTab = () => {
    const dispatch = useAppDispatch();

    const restaurants = useAppSelector((state: RootState) => state.restaurant.restaurants);

    const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
    useEffect(() => {
        setSelectedRestaurants([]);
    }, [restaurants]);

    useEffect(() => {
        dispatch(fetchRestaurant())
    }, [dispatch]);

    const handleDelete = () => {
        if (selectedRestaurants.length) {
            dispatch(deleteRestaurants(selectedRestaurants));
            
            for(const restaurant of selectedRestaurants){
                dispatch(removeRestaurant(restaurant));
            }
            
        }
    };
    const handleCheckboxChange = (checked: boolean, value: string | number) => {
        if (checked) {
            setSelectedRestaurants((prevList) => [...prevList, Number(value)]); // Add value to the selected list
        } else {
            setSelectedRestaurants((prevList) => prevList.filter((item) => item !== Number(value))); // Remove value from the selected list
        }
    };
    return (
        <div>
            <div className="management-header mb-5">
                <h1>Restaurant Management</h1>
                <ButtonGroup>
                    <Button>Add</Button>
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                </ButtonGroup>
            </div>
            {restaurants.length &&
                restaurants.map((r) => (
                    <RestaurantCard r={r} key={r.restaurantId} handleCheckboxChange={handleCheckboxChange} />
                ))}
        </div>
    );
};

export default RestaurantTab;
