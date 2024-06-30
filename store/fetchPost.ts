import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "./postSlice";
import { fetchPosts } from "@/apis/post";
import { AxiosError } from "axios";

export const fetchPostsThunk = createAsyncThunk(
  "post/fetchPosts",
  async (_, { dispatch }) => {
    dispatch(fetchPostsStart());
    try {
      const posts = await fetchPosts();
      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      dispatch(fetchPostsFailure(err.message));
    }
  }
);
