import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "./postSlice";
import { createPost, fetchPosts } from "@/apis/post";
import { AxiosError } from "axios";
import { fetchPostsThunk } from "./fetchPost";

export const createPostsThunk = createAsyncThunk(
  "post/createPost",
  async (param: { description: string; title: string }, { dispatch }) => {
    dispatch(createPostStart());
    try {
      const posts = await createPost({
        description: param.description,
        title: param.title,
      });
      dispatch(createPostSuccess(posts));
      dispatch(fetchPostsThunk());
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      dispatch(createPostFailure(err.message));
    }
  }
);
