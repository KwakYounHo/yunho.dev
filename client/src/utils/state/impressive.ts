import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Impressive } from "@/types/impressive";

const initialState: Impressive = {
  text: "Anxiety arises from ignorance",
};

export const impressiveSlice = createSlice({
  name: "impressive",
  initialState,
  reducers: {
    setImpressive: (state, action: PayloadAction<Impressive>) => {
      state.text = action.payload.text;
    },
  },
});

export const { setImpressive } = impressiveSlice.actions;
export default impressiveSlice.reducer;
