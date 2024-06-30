import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  description: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  createDataStatus: "IDLE" | "ON_GOING" | "FAIL" | "SUCCESS";
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  createDataStatus: "IDLE",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    createPostStart(state) {
      state.createDataStatus = "ON_GOING";
      state.error = null;
    },
    createPostSuccess(state) {
      state.createDataStatus = "SUCCESS";
    },
    createPostFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.createDataStatus = "FAIL";
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostFailure,
  createPostStart,
  createPostSuccess,
} = postSlice.actions;
export default postSlice.reducer;
