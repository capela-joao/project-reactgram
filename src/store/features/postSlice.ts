import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postService } from '@/lib/services/postService';
import { NewPostData, Post } from '@/types/PostsTypes';
import { ApiError } from '@/types/ApiTypes';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PostState = {
  posts: [],
  error: null,
  success: false,
  loading: false,
};

export const createPost = createAsyncThunk<
  Post,
  NewPostData,
  { rejectValue: ApiError }
>('post/createPost', async (data, thunkAPI) => {
  try {
    return await postService.createPost(data);
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

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostSate: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // New Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.success = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.errors?.[0] ?? 'Erro ao criar post.';
      });
  },
});

export const { resetPostSate } = postSlice.actions;
export default postSlice.reducer;
