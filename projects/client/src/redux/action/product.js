import axios from "axios";
import { productSlice } from "../reducer/product";
import { toast } from "react-hot-toast";

export const createProduct = ({ formData }) => {
  return async (dispatch) => {
    console.log(formData);
    try {
      //   let token = localStorage.my_Token;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbnNfaWQiOjIsIm5hbWUiOiJhYmR1bCIsImVtYWlsIjoiYWJkdWxAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIGJyYW5jaCIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2NzkzOTUzNTksImV4cCI6MTY3OTU2ODE1OX0.FTfWFlNR3AeztIEFhYPUelSRZF5Aw4AHAxe6J0lJyFE";
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/product`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(productSlice.actions.createProductSuccess(response.data));

      console.log(response.data);
      toast(response.data.message);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast(error.response.data.message);
      dispatch(productSlice.actions.failed(error.response.data.message));
    }
  };
};

export const editProduct = ({ formData }, { id_product }) => {
  return async (dispatch) => {
    console.log(formData);
    try {
      //   let token = localStorage.my_Token;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbnNfaWQiOjIsIm5hbWUiOiJhYmR1bCIsImVtYWlsIjoiYWJkdWxAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIGJyYW5jaCIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2NzkzOTUzNTksImV4cCI6MTY3OTU2ODE1OX0.FTfWFlNR3AeztIEFhYPUelSRZF5Aw4AHAxe6J0lJyFE";
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/product/${id_product}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch(productSlice.actions.editProductSuccess(response.data));
      toast(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast(error.response.data.message);
      dispatch(productSlice.actions.failed(error.response.data.message));
    }
  };
};

export const updateStock = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);

      let token = localStorage.my_Token;

      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/admin/product-stock/update/${data.id_product}?stock=${data.stock}&description=${data.description}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      dispatch(productSlice.actions.updateCategorySuccess(response.data));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(productSlice.actions.failed(error.response.data.message));
    }
  };
};
