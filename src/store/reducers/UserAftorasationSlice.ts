import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDataAftorization } from "../../models/IActionPaylod";
import { savedIndexDB } from "../../saved-indexDB/saved";
import { RootState } from "../store";

const initialState: IUserDataAftorization = {
  name: "",
  email: "",
  password: "",
  status: "loading",
};

export const userAftorasationSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    dataUserSaveStore(state, action: PayloadAction<IUserDataAftorization>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    savedDataUser(state, action: PayloadAction<IUserDataAftorization>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      const dataUser = {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      };
      savedIndexDB(dataUser);
    },
    registration(state, action) {},
    enter(state, action) {},
  },
});

export const { dataUserSaveStore, enter, registration, savedDataUser } =
  userAftorasationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.ayth;
export default userAftorasationSlice.reducer;
