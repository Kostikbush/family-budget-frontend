import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { savedIndexDB } from "../../helpersFunc/saved";
import { RootState } from "../store";

const initialState: IUser = {
  name: "",
  email: "",
  password: "",
  avatar: "",
  id: "",
  alert: [],
  isSetComment: false,
};

export const userAftorasationSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    dataUserSaveStore(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.avatar = action.payload.avatar;
      state.alert = action.payload.alert;
      state.isSetComment = action.payload.isSetComment;
    },
    savedDataUser(state, action: PayloadAction<IUser>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.alert = action.payload.alert;
      state.isSetComment = action.payload.isSetComment;
      const dataUser = {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
        alert: action.payload.alert,
        avatar: action.payload.avatar,
        id: "",
        isSetComment: action.payload.isSetComment,
      };
      savedIndexDB(dataUser);
    },
  },
});

export const { dataUserSaveStore, savedDataUser } =
  userAftorasationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.ayth;
export default userAftorasationSlice.reducer;
