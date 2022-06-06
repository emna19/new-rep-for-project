import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,

} from "../../actions/actionTypes";

const UserReducer = (state = {}, action) => {
  switch (action.type) {
   
    //LOGIN
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    //LOGOUT
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};

export { UserReducer };
