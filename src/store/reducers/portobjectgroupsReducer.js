import {
    FETCH_PORTOBJECTGROUPS_FAILURE,
    FETCH_PORTOBJECTGROUPS_LOADING,
    FETCH_PORTOBJECTGROUPS_SUCCESS,
    FETCH_PORTOBJECTGROUPS_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function portobjectgroups(state = initialState, action) {
    switch (action.type) {
        case FETCH_PORTOBJECTGROUPS_LOADING:
            return {...state, loading: true};
        case FETCH_PORTOBJECTGROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_PORTOBJECTGROUPS_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_PORTOBJECTGROUPS_RESET:
            return initialState;
        default:
            return state;
    }
}