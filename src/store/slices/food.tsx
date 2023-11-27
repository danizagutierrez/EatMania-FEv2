import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import type { RootState } from '../store';

export type FoodItem = {
    foodId: number;
    foodName: string;
    foodPrice: number;
    rating: number;
    description: string;
    image?: string;
    reviews?: number;
    restaurant?: any;
    adminID?: number;
};

interface FoodState {
    foods: FoodItem[];
    searchKey: string;
}

const initialState: FoodState = {
    foods: [],
    searchKey: ''
};

export const fetchFoods = createAsyncThunk('food/fetchFoods', async () => {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/GetAllFoods');
        return response.data;
    } catch (error) {
        console.log('API Error: ', error);
        throw error;
    }
});

export const foodSlicer = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
        },
        deleteFoods: (state, action: PayloadAction<number[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const index = state.foods.findIndex((r) => r.foodId === action.payload[i]);
                if (index !== -1) {
                    state.foods.splice(index, 1);
                }
            }
        },
        addFood: (state, action: PayloadAction<any>) => {
            state.foods.push({
                ...action.payload
            });
        },
        updateFood: (state, action: PayloadAction<FoodItem>) => {
            const index = state.foods.findIndex((r) => r.foodId === action.payload.foodId);
            if (index !== -1) {
                state.foods[index] = {
                    ...action.payload,
                    foodId: state.foods[index].foodId
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFoods.fulfilled, (state, action) => {
            state.foods = action.payload;
        });
    }
});

export const { setSearchKey, deleteFoods, addFood, updateFood } = foodSlicer.actions;

export default foodSlicer.reducer;

// export const foods = (state: RootState) => state.food.foods;
// export const searchKey = (state: RootState) => state.food.searchKey;
