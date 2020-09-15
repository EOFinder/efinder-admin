import Swal from "sweetalert2";
const url = process.env.REACT_APP_API_URL;

export const GET_ACTIVE_SPEAKER = "GET_ACTIVE_SPEAKER";
export const GET_PENDING_SPEAKER = "GET_PENDING_SPEAKER";
export const GET_INACTIVE_SPEAKER = "GET_INACTIVE_SPEAKER";

export const getActiveSpeaker = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${url}/api/user/activeSpeaker`, options);
  const result = await response.json();

  await dispatch({
    type: GET_ACTIVE_SPEAKER,
    payload: result,
  });
};

export const getPendingSpeaker = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${url}/api/user/pendingSpeaker`, options);
  const result = await response.json();

  await dispatch({
    type: GET_PENDING_SPEAKER,
    payload: result,
  });
};

export const getInactiveSpeaker = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${url}/api/user/InActiveSpeaker`, options);
  const result = await response.json();

  await dispatch({
    type: GET_INACTIVE_SPEAKER,
    payload: result,
  });
};

export const updateStatusSpeaker = (id, status) => async (dispatch) => {
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

    const response = await fetch(`${url}/api/user/${id}`, options);
    const result = await response.json();

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: `Status ${result.data.name}  Menjadi ${status}`,
      });

      dispatch(getActiveSpeaker());
      dispatch(getPendingSpeaker());
      dispatch(getInactiveSpeaker());
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
