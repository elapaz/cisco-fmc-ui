import {
    FETCH_RANGES_FAILURE,
    FETCH_RANGES_LOADING,
    FETCH_RANGES_SUCCESS,
    FETCH_RANGES_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function ranges(state = initialState, action) {
    switch (action.type) {
        case FETCH_RANGES_LOADING:
            return {...state, loading: true};
        case FETCH_RANGES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_RANGES_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_RANGES_RESET:
            return initialState;
        default:
            return state;
    }
}