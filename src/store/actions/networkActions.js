import {
    FETCH_NETWORKS_LOADING,
    FETCH_NETWORKS_SUCCESS,
    FETCH_NETWORKS_FAILURE,
    FETCH_NETWORKS_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchNetworks = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_NETWORKS_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networks?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchNetworksSuccess(response.data.items));

        }).catch(error => {
            fetchNetworksFailure(JSON.stringify(error));
        })
    }
};

export const fetchNetworksSuccess = (data) => {
    return {type: FETCH_NETWORKS_SUCCESS, payload: data};
};

export const fetchNetworksFailure = (error) => {
    return {type: FETCH_NETWORKS_FAILURE, payload: error};
};

export const fetchNetworksReset = () => {
    return {type: FETCH_NETWORKS_RESET}
}