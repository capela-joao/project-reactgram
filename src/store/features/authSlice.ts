import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/lib/services/authService';
import { LoginData, RegisterData } from '@/types/UserTypes';
import {
  ApiSuccessRegister,
  ApiSuccessLogin,
  ApiError,
} from '@/types/ApiTypes';
import { User } from '@/types/UserTypes';

interface AuthState {
  user: User | null;
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
  ApiSuccessRegister,
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

export const login = createAsyncThunk<
  ApiSuccessLogin,
  LoginData,
  { rejectValue: ApiError }
>('auth/login', async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData);

    await thunkAPI.dispatch(getProfile());

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

export const getProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: ApiError }
>('auth/getProfile', async (_, thunkAPI) => {
  try {
    const data = await authService.getProfile();
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

export const Logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
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

      // Register
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
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errors[0] ?? 'Erro desconhecido';
        } else {
          state.error = 'Erro desconhecido';
        }
      })

      // getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload?.errors[0] ?? 'Erro desconhecido';
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
