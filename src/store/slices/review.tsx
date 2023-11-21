import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

export type reviewItem = {
    user_id?: any;
    food?: any;
    review_content: string;
    rating: number;
};

interface reviewState {
    reviews: reviewItem[];
}

const initialState: reviewState = {
    reviews: []
};

export const reviewSlicer = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<reviewItem[]>) => {
            state.reviews = action.payload;
        }
    }
});

export const { setReviews } = reviewSlicer.actions;

export default reviewSlicer.reducer;

// export const reviews = (state: RootState) => state.review.reviews;
// export const searchKey = (state: RootState) => state.review.searchKey;
