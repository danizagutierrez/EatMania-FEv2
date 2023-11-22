import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/index'
// import type { RootState } from '../store';

export type FoodItem = {
    id: number;
    foodName: string;
    foodPrice: number;
    rating: number;
    description: string;
    image: string;
};

interface FoodState {
    foods: FoodItem[];
    searchKey: string;
}

const initialState: FoodState = {
    foods:[],
    searchKey: ''
};

export const foodSlicer = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
        },
        foodSuccess: (state, action: PayloadAction<FoodItem[]>) =>{
            state.foods = action.payload
        }
    }
});

export const { setSearchKey } = foodSlicer.actions;

export default foodSlicer.reducer;

// Actions
const { foodSuccess } = foodSlicer.actions

 export const fetchFood = () => async (dispatch: (arg0: { payload: FoodItem[]; type: "food/foodSuccess"; }) => any) => {
    try {
        await api.get('/GetAllFoods')
            .then((response) => dispatch(foodSuccess(response.data)))
    }
    catch (error : any) {
        return console.error(error?.message);
    }
}

// export const foods = (state: RootState) => state.food.foods;
// export const searchKey = (state: RootState) => state.food.searchKey;
