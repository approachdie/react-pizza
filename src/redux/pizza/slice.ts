import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PizzaItem, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncAction';

const initialState: PizzaSliceState = {
  pizzaItems: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzaItems = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzaItems = [];
        state.status = Status.ERROR;
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
