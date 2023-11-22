import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import foodReducer from './slices/food';
import restaurantSlicer from './slices/restaurants';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        food: foodReducer,
        restaurant: restaurantSlicer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
