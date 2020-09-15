import {
    GET_ALL_TRANSACTION,
    GET_TRANSACTION_DETAIL,
} from "../actions";

const initialState = {allTransaction:[], transactionById:[]};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ALL_TRANSACTION:
            return {...state, allTransaction : actions.payload};
        case GET_TRANSACTION_DETAIL:
            return {...state, transactionById : actions.payload};
        default:
            return state;
    }
};

