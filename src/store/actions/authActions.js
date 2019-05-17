import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../actionTypes';
import axios from "axios";
import {history} from '../../services/history';
import {config} from "../../config";
export const login = (username, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN_REQUEST, username});
        axios.post(`${config
                .apiUrl}/auth`,
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            },
        ).then(response => {
            dispatch(loginSuccess(username, response.data));

        }).catch(error => {
            dispatch(loginFailure(JSON.stringify(error)));
        })
    }
}

export const loginSuccess = (user, data) => {
    return (dispatch) => {
        dispatch({type: LOGIN_SUCCESS, user: user, payload: data});
        history.push('/');
    }

}

export const loginFailure = (data) => {
    return {type: LOGIN_FAILURE, payload: data};
}

export const logout = () => {
    return {type: LOGOUT, payload: null};
}