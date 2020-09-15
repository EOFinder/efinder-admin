const url = process.env.REACT_APP_API_URL;

export const GET_CONTACTUS = "GET_CONTACTUS";

export const getAllContactUs = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}/api/contact/all`, options);
    const result = await response.json();
    console.log(result, 'news');

    await dispatch({
        type: GET_CONTACTUS,
        payload: result,
    });
};