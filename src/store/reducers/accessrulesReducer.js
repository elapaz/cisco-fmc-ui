import {
    FETCH_ACCESSRULES_FAILURE,
    FETCH_ACCESSRULES_LOADING,
    FETCH_ACCESSRULES_SUCCESS,
    FETCH_ACCESSRULES_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function accessrules(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCESSRULES_LOADING:
            return {...state, loading: true};
        case FETCH_ACCESSRULES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_ACCESSRULES_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_ACCESSRULES_RESET:
            return initialState;
        default:
            return state;
    }
}