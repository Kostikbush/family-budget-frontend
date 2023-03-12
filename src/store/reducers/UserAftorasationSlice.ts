import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFromBackUser } from "../../models/IUser";
import { savedIndexDB } from "../../helpersFunc/saved";
import { RootState } from "../store";

const initialState: IFromBackUser = {
  name: "",
  email: "",
  password: "",
  avatar: "",
  id: "",
  alert: [],
  isSetComment: false,
  activationLink: "",
  isActivated: false,
  __v: 0,
  budget: null,
  chat: null,
};

export const userAftorasationSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    dataUserSaveStore(state, action: PayloadAction<IFromBackUser>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.avatar = action.payload.avatar;
      state.alert = action.payload.alert;
      state.isSetComment = action.payload.isSetComment;
      state.budget = action.payload.budget;
      state.chat = action.payload.chat;
    },
    savedDataUser(state, action: PayloadAction<IFromBackUser>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.alert = action.payload.alert;
      state.isSetComment = action.payload.isSetComment;
      state.budget = action.payload.budget;
      state.chat = action.payload.chat;
      const dataUser = {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
        alert: action.payload.alert,
        avatar: action.payload.avatar,
        id: "",
        isSetComment: action.payload.isSetComment,
        budget: action.payload.budget,
        chat: action.payload.chat,
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
