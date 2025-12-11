import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/services/authService';
import { RegisterData } from '@/types/UserTypes';

interface AuthState {
  user: null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  success: false,
  loading: false,
};

export const register = createAsyncThunk<
  void,
  RegisterData,
  { rejectValue: string }
>('auth/register', async (userData, thunkAPI) => {
  try {
    const res = await authService.register(userData);

    if (!res || res.errors) {
      return thunkAPI.rejectWithValue(res?.errors?.[0] || 'Erro ao registrar');
    }

    return;
  } catch {
    return thunkAPI.rejectWithValue('Erro na requisição.');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro inesperado.';
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
