import {
    FETCH_PORTOBJECTGROUPS_LOADING,
    FETCH_PORTOBJECTGROUPS_SUCCESS,
    FETCH_PORTOBJECTGROUPS_FAILURE,
    FETCH_PORTOBJECTGROUPS_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchPortobjectgroups = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_PORTOBJECTGROUPS_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/portobjectgroups?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchPortobjectgroupsSuccess(response.data.items));

        }).catch(error => {
            fetchPortobjectgroupsFailure(JSON.stringify(error));
        })
    }
};

export const fetchPortobjectgroupsSuccess = (data) => {
    return {type: FETCH_PORTOBJECTGROUPS_SUCCESS, payload: data};
};

export const fetchPortobjectgroupsFailure = (error) => {
    return {type: FETCH_PORTOBJECTGROUPS_FAILURE, payload: error};
};

export const fetchPortobjectgroupsReset = () => {
    return {type: FETCH_PORTOBJECTGROUPS_RESET}
}