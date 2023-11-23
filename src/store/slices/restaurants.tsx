import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type IRestaurant = {
    restaurant_id: number;
    cuisine_type?: string;
    name: string;
    description?: string;
    phone_number?: string;
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
    restaurants: [
        // {
        //     restaurant_id: 1,
        //     name: 'Restaurant 1',
        //     cuisine_type: 'ABC Street DEF City GHI State',
        //     rating: '4',
        //     image: '/images/restaurant.png'
        // },
        // {
        //     restaurant_id: 2,
        //     name: 'Restaurant 2',
        //     cuisine_type: '123 Street DEF City GHI State',
        //     rating: '5',
        //     image: '/images/restaurant.png'
        // },
        // {
        //     restaurant_id: 3,
        //     name: 'Restaurant 3',
        //     cuisine_type: 'QWE Street DEF City GHI State',
        //     rating: '4.2',
        //     image: '/images/restaurant.png'
        // },
        // {
        //     restaurant_id: 4,
        //     name: 'Restaurant 4',
        //     cuisine_type: 'ASD Street DEF City GHI State',
        //     rating: '4.3',
        //     image: '/images/restaurant.png'
        // },
        // {
        //     restaurant_id: 5,
        //     name: 'Restaurant 5',
        //     cuisine_type: 'ABC Street DEF City GHI State',
        //     rating: '4.8',
        //     image: '/images/restaurant.png'
        // }
    ],
    success: false
};

export const restaurantSlicer = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        deleteRestaurants: (state, action: PayloadAction<number[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const index = state.restaurants.findIndex(
                    (r) => r.restaurant_id === action.payload[i]
                );
                if (index !== -1) {
                    state.restaurants.splice(index, 1);
                }
            }
        },
        addRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            state.restaurants.push({
                ...action.payload,
                restaurant_id: state.restaurants.length + 1,
                image: '/images/restaurant.png',
                rating: '0'
            });
            state.success = true;
        },
        updateRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            const index = state.restaurants.findIndex(
                (r) => r.restaurant_id === action.payload.restaurant_id
            );
            if (index !== -1) {
                state.restaurants[index] = {
                    ...action.payload,
                    restaurant_id: state.restaurants[index].restaurant_id,
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


// export const foods = (state: RootState) => state.food.foods;
// export const searchKey = (state: RootState) => state.food.searchKey;
