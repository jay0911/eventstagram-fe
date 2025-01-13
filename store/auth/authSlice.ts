import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cookieService } from '../../utils/cookieService';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
}

// Initialize state without accessing cookies
const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      cookieService.clearAll();
    },
    initializeAuth: (state) => {
      const user = cookieService.getUser();
      state.user = user;
      state.isAuthenticated = !!user;
    }
  }
});

export const { setUser, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 