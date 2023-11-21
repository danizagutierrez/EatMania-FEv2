import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import footReducer from './slices/food';
import restaurantSlicer from './slices/restaurants';
import reviewSlicer from './slices/review';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        food: footReducer,
        restaurant: restaurantSlicer,
        review: reviewSlicer
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
