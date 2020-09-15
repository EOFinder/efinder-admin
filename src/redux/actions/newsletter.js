const url = process.env.REACT_APP_API_URL;

export const GET_NEWSLETTER = "GET_NEWSLETTER";

export const getAllNewsletter = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}/api/newsletter/getallnewsletter`, options);
    const result = await response.json();
    console.log(result, 'news');

    await dispatch({
        type: GET_NEWSLETTER,
        payload: result,
    });
};