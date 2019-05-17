import {
    FETCH_NETWORKGROUPS_FAILURE,
    FETCH_NETWORKGROUPS_LOADING,
    FETCH_NETWORKGROUPS_SUCCESS,
    FETCH_NETWORKGROUPS_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function networkgroups(state = initialState, action) {
    switch (action.type) {
        case FETCH_NETWORKGROUPS_LOADING:
            return {...state, loading: true};
        case FETCH_NETWORKGROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_NETWORKGROUPS_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_NETWORKGROUPS_RESET:
            return initialState;
        default:
            return state;
    }
}