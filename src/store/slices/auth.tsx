import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

export type IUser = {
    user_id?: number;
    user_firstname?: string;
    user_lastname?: string;
    user_email?: string;
    user_phonenumber?: string;
    email_verified_at?: boolean;
    is_admin?: boolean;
    is_active?: boolean;
    updated_at?: string;
    deleted_at?: string;
    created_at?: string;
    user_password?: string;
    birthday?: string;
    user_address?: string;
    subscription?: string;
    next_renewal?: string;
};

interface IError {
    password: boolean;
    email: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
    user: IUser;
    errors: IError;
    tab: string;
    authSuccess: boolean;
    userList: IUser[];
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {},
    errors: {
        password: false,
        email: false
    },
    tab: 'signin',
    authSuccess: false,
    userList: [
        {
            user_id: 1,
            user_firstname: 'Admin',
            user_lastname: 'User',
            user_email: 'admin@user.com',
            email_verified_at: true,
            is_admin: true,
            is_active: true,
            user_password: '123456'
        },
        {
            user_id: 2,
            user_firstname: 'Test',
            user_lastname: 'User',
            user_email: 'test@user.com',
            email_verified_at: true,
            is_admin: false,
            is_active: true,
            user_password: '123456',
            subscription: 'Monthly',
            next_renewal: '01/01/2024'
        }
    ]
};

export const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
            if (state.userList.filter((user) => user.user_email === action.payload.email).length) {
                if (
                    state.userList.filter((user) => user.user_email === action.payload.email)[0]
                        .user_password === action.payload.password
                ) {
                    state.user = state.userList.filter(
                        (user) => user.user_email === action.payload.email
                    )[0];
                    state.isAuthenticated = true;
                } else {
                    state.errors.password = true;
                }
            } else {
                state.errors.email = true;
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {};
        },
        registerUser: (state, action: PayloadAction<any>) => {
            if (state.userList.filter((user) => user.user_email === action.payload.email).length) {
                state.errors.email = true;
            } else {
                state.userList.push({
                    user_firstname: action.payload.firstname,
                    user_lastname: action.payload.lastname,
                    user_email: action.payload.email,
                    user_password: action.payload.password,
                    is_active: true,
                    is_admin: false,
                    user_id: state.userList.length + 1,
                    created_at: new Date().toISOString()
                });
                state.authSuccess = true;
                state.tab = 'signin';
                state.errors = {
                    password: false,
                    email: false
                };
            }
        },
        setSignTab: (state, action: PayloadAction<string>) => {
            state.tab = action.payload;
        },
        clearErrors: (state) => {
            state.errors = {
                password: false,
                email: false
            };
        },
        updateUserProfile: (state, action: PayloadAction<any>) => {
            if (action.payload.user_id) {
                if (
                    state.userList.filter(
                        (user) =>
                            user.user_email === action.payload.email &&
                            user.user_id !== action.payload.user_id
                    ).length
                ) {
                    state.errors.email = true;
                } else {
                    const userIndex = state.userList.findIndex(
                        (u) => u.user_id === action.payload.user_id
                    );
                    state.userList[userIndex].user_firstname = action.payload.firstname;
                    state.userList[userIndex].user_lastname = action.payload.lastname;
                    state.userList[userIndex].user_email = action.payload.email;
                    state.userList[userIndex].birthday = action.payload.birthday;
                    state.authSuccess = true;
                    state.errors = {
                        password: false,
                        email: false
                    };
                }
            } else {
                if (
                    state.userList.filter(
                        (user) =>
                            user.user_email === action.payload.email &&
                            user.user_email !== state.user.user_email
                    ).length
                ) {
                    state.errors.email = true;
                } else {
                    state.user.user_firstname = action.payload.firstname;
                    state.user.user_lastname = action.payload.lastname;
                    state.user.user_email = action.payload.email;
                    state.user.birthday = action.payload.birthday;
                    const userIndex = state.userList.findIndex(
                        (u) => u.user_id === state.user.user_id
                    );
                    state.userList[userIndex] = state.user;
                    state.authSuccess = true;
                    state.errors = {
                        password: false,
                        email: false
                    };
                }
            }
        },
        updateUserPassword: (state, action: PayloadAction<string>) => {
            state.user.user_password = action.payload;
            const userIndex = state.userList.findIndex((u) => u.user_id === state.user.user_id);
            state.userList[userIndex] = state.user;
        },
        clearSuccess: (state) => {
            state.authSuccess = false;
        },
        deleteCustomers: (state, action: PayloadAction<number[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const index = state.userList.findIndex((r) => r.user_id === action.payload[i]);
                if (index !== -1) {
                    state.userList.splice(index, 1);
                }
            }
        }
    }
});

export const {
    setIsAuthenticated,
    loginUser,
    registerUser,
    setSignTab,
    clearErrors,
    updateUserProfile,
    updateUserPassword,
    clearSuccess,
    logout,
    deleteCustomers
} = authSlicer.actions;

// export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const user = (state: RootState) => state.auth.user;

export default authSlicer.reducer;
