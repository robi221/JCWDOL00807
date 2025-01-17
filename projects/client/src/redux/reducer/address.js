import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: {},
  errorMessage: null,
  loading: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressSuccess: (state, action) => {
      state.userAddress = action.payload;
      state.loading = null;
      state.errorMessage = null;
    },

    failed: (state, action) => {
      state.errorMessage = action.payload;
      state.loading = null;
    },
    stateError: (state, action) => {
      state.userAddress = action.payload;
      state.errorMessage = null;
    },
    getAllAddress: (state, action) => {
      state.userAddress = action.payload;
      state.errorMessage = null;
    },
    editAddressSuccess: (state, action) => {
      state.userAddress = action.payload;
      state.errorMessage = null;
    },
    removeAddressSuccess: (state, action) => {
      state.userAddress = action.payload;
      state.errorMessage = null;
    },
    findAll_address_request: (state, action) => {
      state.userAddress = action;
      state.loading = null;
    },
  },
});

export const {
  updateAddressSuccess,
  failed,
  stateError,
  getAllAddress,
  editAddressSuccess,
  removeAddressSuccess,
} = addressSlice.actions;
export default addressSlice.reducer;
