import axios from "axios";
import { toast } from "react-hot-toast";
import { authSlice } from "../reducer/auth";

export const keep_login_request = "keep_login_request";
export const kepp_login_payload = "keep_login_payload";
export const registerUser = ({
  name,
  email,
  password,
  repeatPassword,
  phone_number,
  referral_code,
}) => {
  return async (dispatch) => {
    try {
      console.log(name, email, password, phone_number);
      let response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        { name, email, password, phone_number, ref_code: referral_code }
      );
      console.log(response.data);
      dispatch(authSlice.actions.registerSuccess(response.data));
      toast(response.data.message);
    } catch (error) {
      dispatch(authSlice.actions.failed(error.response.data.message));
      console.log(error);
      toast(error.response.data.message);
    }
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const getUserLogin = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/login?email=${email}&password=${password}`
      );
      dispatch(authSlice.actions.loginSuccess(getUserLogin.data));
    } catch (error) {
      dispatch(authSlice.actions.failed(error.response.data.message));
    }
  };
};

export const keepLogin = () => {
  try {
    return async (dispatch) => {
      dispatch({ type: keep_login_request });
      let getStorage = localStorage.my_Token;
      let response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/keep-login`,
        {
          headers: {
            Authorization: `${getStorage}`,
          },
        }
      );
      dispatch(authSlice.actions.keep_login_payload(response.data.data));
    };
  } catch (error) {
    console.log(error);
  }
};
