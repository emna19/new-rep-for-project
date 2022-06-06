import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../../actions/actionTypes";

const SignUpReducer = (state = {}, action) => {

    switch(action.type){
         //REGISTER
    case USER_REGISTER_REQUEST:
        return {
          loading: true,
        };
      case USER_REGISTER_SUCCESS:
        return {
          userInfo: action.payload,
        };
      case USER_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        default:
      return state;
    }

}

export {SignUpReducer}