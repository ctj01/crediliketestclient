import { IUser, SET_USERS } from "../../constants/constantData";
import { postService } from "../../services/PostService";
import { getService } from './../../services/getService';
import  axios  from 'axios';
import { API } from "../../services/apiUrl";

export function setUsers( user : Array<IUser>) {
    return {
        type: SET_USERS,
        user: user
    };
}
export function getUsers() {
    return async (dispatch: any) => {
        const response = await getService("Client");
         dispatch(setUsers(response.data.data));
    };
}
export const saveUsers = (user : Array<IUser>) => {
    return async (dispatch : any) => {
        const response =  await postService("Client", user);
        response.status === 200 && dispatch(getUsers());
        return response;
    }
}
export const searchUser = (predicate : string, page: number) => {
    return async (dispatch : any) => {
        const response =  await getService(`Client/Search/${page}/${3}/${predicate}`,);
        response.status === 200 && dispatch(setUsers(response.data.data));
        return response;
    }
}
export const removeClient = (id : number) => {
    return async (dispatch : any) => {
        const response =  await axios.delete(`${API}Client/${id}`);
        response.status === 200 && dispatch(getUsers());
        return response;
    }
}