const initialState = {
    allEvents : [],
    pendingEvents : [],
    acceptedEvents: []
}

export default (state = initialState, actions) => {
    if(actions.type === "GET_ALL_EVENTS"){
        return {...state, allEvents: actions.payload}
    } else if(actions.type === "GET_ACTIVE_EVENTS"){
        return {...state, acceptedEvents: actions.payload}
    } else if(actions.type === "GET_PENDING_EVENTS"){
        return {...state, pendingEvents: actions.payload}
    }
    return state;
};