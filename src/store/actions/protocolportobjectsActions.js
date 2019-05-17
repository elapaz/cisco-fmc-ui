import {
    FETCH_PROTOCOLPORTOBJECTS_LOADING,
    FETCH_PROTOCOLPORTOBJECTS_SUCCESS,
    FETCH_PROTOCOLPORTOBJECTS_FAILURE,
    FETCH_PROTOCOLPORTOBJECTS_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchProtocolportobjects = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_PROTOCOLPORTOBJECTS_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/protocolportobjects?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchProtocolportobjectsSuccess(response.data.items));

        }).catch(error => {
            fetchProtocolportobjectsFailure(JSON.stringify(error));
        })
    }
};

export const fetchProtocolportobjectsSuccess = (data) => {
    return {type: FETCH_PROTOCOLPORTOBJECTS_SUCCESS, payload: data};
};

export const fetchProtocolportobjectsFailure = (error) => {
    return {type: FETCH_PROTOCOLPORTOBJECTS_FAILURE, payload: error};
};

export const fetchProtocolportobjectsReset = () => {
    return {type: FETCH_PROTOCOLPORTOBJECTS_RESET}
};