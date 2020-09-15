import {
    GET_ACTIVE_SPEAKER,
    GET_PENDING_SPEAKER,
    GET_INACTIVE_SPEAKER
} from "../actions";

const initialState = {activeSpeaker:[], pendingSpeaker:[], inactiveSpeaker:[] };

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ACTIVE_SPEAKER:
            return {...state, activeSpeaker : actions.payload};
        case GET_PENDING_SPEAKER:
            return {...state, pendingSpeaker : actions.payload};
        case GET_INACTIVE_SPEAKER:
            return {...state, inactiveSpeaker : actions.payload};
        default:
            return state;
    }
};