import {FETCH_AUDIT_FAILURE, FETCH_AUDIT_LOADING, FETCH_AUDIT_SUCCESS, FETCH_AUDIT_RESET} from "../actionTypes";

const initialState = {
    loading: false,
    error: false,
    byId: [],
    allIds: [],
}

export function audit(state = initialState, action) {
    switch (action.type) {
        case FETCH_AUDIT_LOADING:
            return {...state, loading: true};
        case FETCH_AUDIT_SUCCESS:
            return {...state, loading: false, error: false, data: action.payload};
        case FETCH_AUDIT_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_AUDIT_RESET:
            return initialState;
        default:
            return state;
    }
}