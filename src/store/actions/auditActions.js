import {
    FETCH_AUDIT_LOADING,
    FETCH_AUDIT_SUCCESS,
    FETCH_AUDIT_FAILURE,
    FETCH_AUDIT_RESET
} from "../actionTypes";
import axios from "axios";
import {config} from "../../config";

export const fetchAudit = () => {
    return (dispatch, getState) => {
        const {token, refreshToken} = getState().authentication;
        dispatch({type: FETCH_AUDIT_LOADING});
        axios.get(`${config.apiUrl}/api/fmc_platform/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/audit/auditrecords?limit=1000&expanded=True`,
            {
                headers: {
                    'x-auth-access-token': token,
                    'x-auth-refresh-token': refreshToken,
                },
            },
        ).then(response => {
            dispatch(fetchAuditSuccess(response.data.items));

        }).catch(error => {
            dispatch(fetchAuditFailure(JSON.stringify(error)));
        })
    }
};

export const fetchAuditSuccess = (data) => {
    return {type: FETCH_AUDIT_SUCCESS, payload: data};
};

export const fetchAuditFailure = (error) => {
    return {type: FETCH_AUDIT_FAILURE, payload: error};
};

export const fetchAuditReset = () => {
    return {type: FETCH_AUDIT_RESET}
}