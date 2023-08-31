import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostItem, Status } from "../../types/types";
import axios from "../../axios";
import { ALL_POSTS_PATH, TAGS_PATH } from "../../utils/constants";
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk<PostItem[]>("posts/fetchPosts", async () => {
  const { data } = await axios.get<PostItem[]>(ALL_POSTS_PATH);
  return data;
});

export const fetchTags = createAsyncThunk<string[]>("tags/fetchTags", async () => {
  const { data } = await axios.get<string[]>(TAGS_PATH);
  return data;
});

export interface PostState {
  posts: {
    items: PostItem[];
    status: Status;
  };
  tags: {
    items: string[];
    status: Status;
  };
}

const initialState: PostState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
};

const postSilce = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = Status.LOADING;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = Status.SUCCESS;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = Status.ERROR;
    });
    //tags
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = Status.LOADING;
    });

    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = Status.SUCCESS;
    });

    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = Status.ERROR;
    });
  },
});

export const postsReducer = postSilce.reducer;

export const selectStatus = (state: RootState) => state.posts.posts.status;
export const selectPosts = (state: RootState) => state.posts.posts.items;

export const selectTags = (state: RootState) => state.posts.tags.items;
export const selectTagsStatus = (state: RootState) => state.posts.tags.status;
