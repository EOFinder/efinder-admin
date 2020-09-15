import Swal from 'sweetalert2'
const url = 'http://localhost:4444/api/events';

const GET_ALL_EVENTS = "GET_ALL_EVENTS";

export const getAllEvents = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}/accepted`, options);
    const result = await response.json();
    console.log(result)
    await dispatch({
        type: GET_ALL_EVENTS,
        payload: result.acceptedEvents
    })
}
export const getAcceptedEvents = () => async (dispatch) => {
    const token = localStorage.getItem("token");
  
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${url}/accepted`, options);
    const result = await response.json();
  
    await dispatch({
      type: "GET_ACTIVE_EVENTS",
      payload: result,
    });
  };
  
  export const getPendingEvents = () => async (dispatch) => {
    const token = localStorage.getItem("token");
  
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${url}/pending`, options);
    const result = await response.json();
    await dispatch({
      type: "GET_PENDING_EVENTS",
      payload: result.pendingEvents,
    });
  };
  
  export const updateStatusEvents = (id, status) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
  
      const options = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: status }),
      };
  
      const response = await fetch(`http://localhost:4444/admin/approval/${id}`, options);
      const result = await response.json();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Status ${result.pendingEvents.title}  Menjadi ${status}`,
        });
  
        dispatch(getAllEvents());
        dispatch(getPendingEvents());
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };