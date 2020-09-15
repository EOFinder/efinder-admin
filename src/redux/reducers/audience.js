import {
    GET_ALL_AUDIENCE,
} from "../actions";

const initialState = [];

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ALL_AUDIENCE:
            return actions.payload;
        default:
            return state;
    }
};