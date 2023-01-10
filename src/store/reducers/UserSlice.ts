import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDataAftorization } from "../../models/IActionPaylod";
import { getDataFromIndexDB, savedIndexDB } from "../../saved-indexDB/saved";
import { RootState } from "../store";

const initialState: IUserDataAftorization = {
  name: "",
  email: "",
  password: "",
};

export const userAftorasationSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getDataUser(state) {
      let data = getDataFromIndexDB();
      if (!data) {
        return;
      } else if (data.email !== "") {
        state.name = data.name;
        state.email = data.email;
        state.password = data.password;
      }
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
export const { getDataUser, enter, registration, savedDataUser } =
  userAftorasationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.ayth;
export default userAftorasationSlice.reducer;
