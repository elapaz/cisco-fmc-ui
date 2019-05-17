import {
    FETCH_RANGES_LOADING,
    FETCH_RANGES_SUCCESS,
    FETCH_RANGES_FAILURE,
    FETCH_RANGES_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchRanges = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_RANGES_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/ranges?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchRangesSuccess(response.data.items));

        }).catch(error => {
            fetchRangesFailure(JSON.stringify(error));
        })
    }
};

export const fetchRangesSuccess = (data) => {
    return {type: FETCH_RANGES_SUCCESS, payload: data};
};

export const fetchRangesFailure = (error) => {
    return {type: FETCH_RANGES_FAILURE, payload: error};
};

export const fetchRangesReset = () => {
    return {type: FETCH_RANGES_RESET}
}