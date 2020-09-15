import Swal from "sweetalert2";
const url = process.env.REACT_APP_API_URL;

export const GET_ALL_ADMIN = "GET_ALL_ADMIN";
// export const GET_ADMIN_BY_ID = "GET_ADMIN_BY_ID";
export const GET_ADMIN_DASHBOARD = "GET_ADMIN_DASHBOARD";

export const getAllAdmin = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`http://localhost:4444/admin`, options);
    const result = await response.json();
   
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    await dispatch({
        type: GET_ALL_ADMIN,
        payload: result.admins,
    });
};

// export const getAdminByID = (id) => async (dispatch) => {
//     const token = localStorage.getItem("token");

//     const options = {
//         method: "GET",
//         headers: {
//             "content-type": "application/json",
//             authorization: `Bearer ${token}`,
//         },
//     };

//     const response = await fetch(`${url}/api/admin/${id}`, options);
//     const result = await response.json();

//     console.log(result,"bbbbbbbbbbbbb")

//     dispatch({
//         type: GET_ADMIN_BY_ID,
//         payload: result.result,
//     });
// };

export const addAdmin = (values, role, history) => async () => {
    const token = localStorage.getItem("token");
    console.log(role);
    try {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        };

        const response = await fetch(`${url}/api/admin/add/${role}`, options);
        const result = await response.json();

        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "New Admin successfully Created",
            });

            history.goBack();
        } else {
            Swal.fire({
                icon: "error",
                title: result.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateAdmin = (values, id, history) => async () => {
    const token = localStorage.getItem("token");

    try {
        for (let key in values) {
            if (values[key] === "") {
                delete values[key];
            }
        }

        const options = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        };

        const response = await fetch(`${url}/api/admin/${id}`, options);
        const result = await response.json();

        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Your data is successfully updated",
            });

            history.goBack();
        } else {
            Swal.fire({
                icon: "error",
                title: result.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteAdmin = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
        const options = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${url}/api/admin/${id}`, options);
        const result = await response.json();

        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Admin is deleted",
            });

            dispatch(getAllAdmin());
        } else {
            Swal.fire({
                icon: "error",
                title: result.message,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getDashboard = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}/dashboard/admins`, options);
    const result = await response.json();

    await dispatch({
        type: GET_ADMIN_DASHBOARD,
        payload: result.data,
    });
};