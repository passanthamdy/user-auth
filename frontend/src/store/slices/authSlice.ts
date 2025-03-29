import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}
const initialState: AuthState = {
  userId: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { accessToken, refreshToken, userId } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = userId;
      
      accessToken && localStorage.setItem('accessToken', accessToken);
      refreshToken && localStorage.setItem('refreshToken', refreshToken);
    },
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
