import { SET_USERS } from "../../constants/constantData";
import { initialState } from './../initialState/initialState';

export function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.user
            };
        default:
            return state;
    }
}