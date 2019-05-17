import {FETCH_HOSTS_FAILURE, FETCH_HOSTS_LOADING, FETCH_HOSTS_SUCCESS, FETCH_HOSTS_RESET} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function hosts(state = initialState, action) {
    switch (action.type) {
        case FETCH_HOSTS_LOADING:
            return {...state, loading: true};
        case FETCH_HOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_HOSTS_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_HOSTS_RESET:
            return initialState;
        default:
            return state;
    }
}