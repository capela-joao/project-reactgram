import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/services/authService';
import { RegisterData } from '@/types/UserTypes';
import { ApiSuccess, ApiError } from '@/types/ApiTypes';

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
  ApiSuccess,
  RegisterData,
  { rejectValue: ApiError }
>('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);
    return data;
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'errors' in err &&
      Array.isArray((err as ApiError).errors)
    ) {
      return thunkAPI.rejectWithValue(err as ApiError);
    }

    return thunkAPI.rejectWithValue({ errors: ['Erro inesperado'] });
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
        if (action.payload) {
          state.error = action.payload.errors[0] ?? 'Erro desconhecido';
        } else {
          state.error = 'Erro desconhecido';
        }
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
