import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormLoginValues, FormRegisterValues, Status, User } from "../../types/types";
import axios from "../../axios";
import { AUTH_LOGIN_PATH, AUTH_ME_PATH, AUTH_REGISTER_PATH } from "../../utils/constants";
import { RootState } from "../store";

export const fetchAuth = createAsyncThunk<User, FormLoginValues>(
  "auth/fetchAuth",
  async (params) => {
    const { data } = await axios.post<User>(AUTH_LOGIN_PATH, params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk<User>("auth/fetchAuthMe", async (params) => {
  const { data } = await axios.get<User>(AUTH_ME_PATH);
  return data;
});

export const fetchRegister = createAsyncThunk<User, FormRegisterValues>(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post<User>(AUTH_REGISTER_PATH, params);
    return data;
  }
);

export interface AuthtState {
  data: null | User;
  status: Status;
}

const initialState: AuthtState = {
  data: null,
  status: Status.LOADING,
};

const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    });

    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    });

    // auth me
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    });

    // register
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = Status.LOADING;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = Status.ERROR;
    });
  },
});

export const { logout } = authSilce.actions;
export const authReducer = authSilce.reducer;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectStatus = (state: RootState) => state.posts.posts.status;
export const selectUserData = (state: RootState) => state.auth.data;
