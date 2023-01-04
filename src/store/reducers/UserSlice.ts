import { createSlice } from "@reduxjs/toolkit";
import { getDataFromIndexDB } from "../../saved-indexDB/saved";

interface UserState {
  name: string | null;
  email: string | null;
  password: null | string;
  isLoading: boolean;
  error: string;
}
const initialState: UserState = {
  name: "Пользователь",
  email: null,
  password: null,
  isLoading: false,
  error: "",
};

export const userAftorasationSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getDataUser(state, action) {
      let data = getDataFromIndexDB();
      if (!data) {
        return;
        // eslint-disable-next-line valid-typeof
      } else if (typeof data.email !== null) {
        state.name = data.name;
        state.email = data.email;
        state.password = data.password;
      }
    },
  },
});
export default userAftorasationSlice.reducer;
