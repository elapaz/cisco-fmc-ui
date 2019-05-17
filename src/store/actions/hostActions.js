import {
    FETCH_HOSTS_LOADING,
    FETCH_HOSTS_SUCCESS,
    FETCH_HOSTS_FAILURE,
    FETCH_HOSTS_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchHosts = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_HOSTS_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/hosts?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchHostsSuccess(response.data.items));

        }).catch(error => {
            fetchHostsFailure(JSON.stringify(error));
        })
    }
};

export const fetchHostsSuccess = (data) => {
    return {type: FETCH_HOSTS_SUCCESS, payload: data};
};

export const fetchHostsFailure = (error) => {
    return {type: FETCH_HOSTS_FAILURE, payload: error};
};

export const fetchHostsReset = () => {
    return {type: FETCH_HOSTS_RESET}
}