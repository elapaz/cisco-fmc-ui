import {
    FETCH_PROTOCOLPORTOBJECTS_FAILURE,
    FETCH_PROTOCOLPORTOBJECTS_LOADING,
    FETCH_PROTOCOLPORTOBJECTS_SUCCESS,
    FETCH_PROTOCOLPORTOBJECTS_RESET
} from "../actionTypes";
import {arrayToObject, arrayToObjectIds} from "../../services/data";

const initialState = {
    loading: false,
    error: false,
    blank: true,
    byId: [],
    allIds: [],
}

export function protocolportobjects(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROTOCOLPORTOBJECTS_LOADING:
            return {...state, loading: true};
        case FETCH_PROTOCOLPORTOBJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                byId: arrayToObject(action.payload),
                allIds: arrayToObjectIds(action.payload),
                blank: false,
            };
        case FETCH_PROTOCOLPORTOBJECTS_FAILURE:
            return {...state, loading: false, error: true};
        case FETCH_PROTOCOLPORTOBJECTS_RESET:
            return initialState;
        default:
            return state;
    }
}