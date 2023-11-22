import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/index'

export type IRestaurant = {
    restaurantId: number;
    name: string;
    phoneNumber: string;
    cuisineType: string;
    rating: string;
    description: string;
    website: string;
    image: string;
};

interface RestaurantState {
    restaurants: IRestaurant[];
}

const initialState: RestaurantState = {
    // initial state before calling the API
    restaurants: []
};

export const restaurantSlicer = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        deleteRestaurants: (state, action: PayloadAction<number[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const index = state.restaurants.findIndex((r) => r.restaurantId === action.payload[i]);
                if (index !== -1) {
                    state.restaurants.splice(index, 1);
                }
            }
        },
        addRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            state.restaurants.push({ ...action.payload, restaurantId: state.restaurants.length });
        },
        updateRestaurant: (state, action: PayloadAction<IRestaurant>) => {
            const index = state.restaurants.findIndex((r) => r.restaurantId === action.payload.restaurantId);
            if (index !== -1) {
                state.restaurants[index] = {
                    ...action.payload,
                    restaurantId: state.restaurants[index].restaurantId,
                    image: state.restaurants[index].image
                };
            }
        },
        restaurantSuccess: (state, action: PayloadAction<IRestaurant[]>) =>{
            state.restaurants = action.payload
        }
    }
});

export const { deleteRestaurants, addRestaurant, updateRestaurant } = restaurantSlicer.actions;

export default restaurantSlicer.reducer;


// Action
const { restaurantSuccess } = restaurantSlicer.actions

export const fetchRestaurant = () => async (dispatch: (arg0: { payload: IRestaurant[]; type: "restaurant/restaurantSuccess"; }) => any) => {
try {
        await api.get('/admin/restaurants')
            .then((response) => dispatch(restaurantSuccess(response.data)))
    }
    catch (error : any) {
        return console.error(error?.message);
    }
}

//Action
export const removeRestaurant = (restaurantID: number) => async () => {
    try {
            await api.delete(`/admin/restaurants/${restaurantID}`)
                .then((response) => console.log('RESPONSE STATUS: ', response.status))
        }
        catch (error : any) {
            return console.error(error?.message);
        }
    }

