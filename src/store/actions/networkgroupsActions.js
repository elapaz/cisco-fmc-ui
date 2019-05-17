import {
    FETCH_NETWORKGROUPS_LOADING,
    FETCH_NETWORKGROUPS_SUCCESS,
    FETCH_NETWORKGROUPS_FAILURE,
    FETCH_NETWORKGROUPS_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchNetworkgroups = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_NETWORKGROUPS_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networkgroups?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchNetworkgroupsSuccess(response.data.items));

        }).catch(error => {
            fetchNetworkgroupsFailure(JSON.stringify(error));
        })
    }
};

export const fetchNetworkgroupsSuccess = (data) => {
    return {type: FETCH_NETWORKGROUPS_SUCCESS, payload: data};
};

export const fetchNetworkgroupsFailure = (error) => {
    return {type: FETCH_NETWORKGROUPS_FAILURE, payload: error};
};

export const fetchNetworkgroupsReset = () => {
    return {type: FETCH_NETWORKGROUPS_RESET}
}