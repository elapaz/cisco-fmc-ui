import {
    FETCH_ACCESSRULES_LOADING,
    FETCH_ACCESSRULES_SUCCESS,
    FETCH_ACCESSRULES_FAILURE,
    FETCH_ACCESSRULES_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchAccessrules = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_ACCESSRULES_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/policy/accesspolicies/005D73DB-3806-0ed3-0000-081604378757/accessrules?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchAccessrulesSuccess(response.data.items));

        }).catch(error => {
            fetchAccessrulesFailure(JSON.stringify(error));
        })
    }
};

export const fetchAccessrulesSuccess = (data) => {
    return {type: FETCH_ACCESSRULES_SUCCESS, payload: data};
};

export const fetchAccessrulesFailure = (error) => {
    return {type: FETCH_ACCESSRULES_FAILURE, payload: error};
};

export const fetchAccessrulesReset = () => {
    return {type: FETCH_ACCESSRULES_RESET}
}