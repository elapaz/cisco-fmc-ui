import {
    FETCH_NETWORKS_FAILURE,
    FETCH_NETWORKS_LOADING,
    FETCH_NETWORKS_SUCCESS,
    FETCH_NETWORKS_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function networks(state = initialState, action) {
    switch (action.type) {
        case FETCH_NETWORKS_LOADING:
            return {...state, loading: true};
        case FETCH_NETWORKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_NETWORKS_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_NETWORKS_RESET:
            return initialState;
        default:
            return state;
    }
}