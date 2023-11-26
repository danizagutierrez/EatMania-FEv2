import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type IRestaurant = {
    restaurantId: number;
    cuisineType?: string;
    name: string;
    description?: string;
    phoneNumber?: string;
    rating?: string;
    website?: string;
    image?: string;
};

interface RestaurantState {
    restaurants: IRestaurant[];
    success: boolean;
}

//The list of restaurants should go here

const initialState: RestaurantState = {
    restaurants: [],
    success: false
};

export const restaurantSlicer = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        deleteRestaurants: (state, action: PayloadAction<number[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const index = state.restaurants.findIndex(
                    (r) => r.restaurantId === action.payload[i]
                );
                if (index !== -1) {
                    state.restaurants.splice(index, 1);
                }
            }
        },
        addRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            state.restaurants.push({
                ...action.payload,
                restaurantId: state.restaurants.length + 1,
                image: '/images/restaurant.png',
                rating: '0'
            });
            state.success = true;
        },
        updateRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            const index = state.restaurants.findIndex(
                (r) => r.restaurantId === action.payload.restaurantId
            );
            if (index !== -1) {
                state.restaurants[index] = {
                    ...action.payload,
                    restaurantId: state.restaurants[index].restaurantId,
                    image: '/images/restaurant.png',
                    rating: state.restaurants[index].rating
                };
                state.success = true;
            }
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        restaurantSuccess: (state, action: PayloadAction<IRestaurant[]>) =>{
            state.restaurants = action.payload
        }
        
    }
});

export const { deleteRestaurants, addRestaurant, updateRestaurant, clearSuccess } =
    restaurantSlicer.actions;

export default restaurantSlicer.reducer;

// Action
const { restaurantSuccess } = restaurantSlicer.actions

export const fetchRestaurant = () => async (dispatch: (arg0: { payload: IRestaurant[]; type: "restaurant/restaurantSuccess"; }) => any) => {
try {
        await axios.get(process.env.REACT_APP_API_URL + '/api/admin/restaurants')
            .then((response) => dispatch(restaurantSuccess(response.data)))
    }
    catch (error : any) {
        return console.error(error?.message);
    }
}
