import {
    GET_CONTACTUS
} from "../actions";

const initialState = [];

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CONTACTUS:
            return actions.payload;

        default:
            return state;
    }
};