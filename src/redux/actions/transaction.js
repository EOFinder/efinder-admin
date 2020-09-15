import Swal from "sweetalert2";
const url = process.env.REACT_APP_API_URL;

export const GET_ALL_TRANSACTION = "GET_ALL_TRANSACTION";
export const GET_TRANSACTION_DETAIL = "GET_TRANSACTION_DETAIL";

export const getAllTransaction = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}/api/transaksi/alltrans`, options);
    const result = await response.json();
   

    await dispatch({
        type: GET_ALL_TRANSACTION,
        payload: result.data,
    });
};

export const getTransactionDetail = (id) => async (dispatch) => {
    let url = `${process.env.REACT_APP_API_URL}/api/transaksi/transId/${id}`;

    const token = localStorage.getItem("token");
    let options = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    let response = await fetch(url, options);
    let results = await response.json();
    dispatch({
        type: GET_TRANSACTION_DETAIL,
        payload: results
    });
};

export const updateAdminPayment = (id, formData) => async (
    dispatch
) => {
    try {
        const token = localStorage.getItem("token");
        const url = `${process.env.REACT_APP_API_URL}/api/transaksi/update/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        };
        console.log(formData, 'formdataku')
        const response = await fetch(url, options);
        const result = await response.json();

        if (response.status === 200) {
            Swal.fire({
                icon: "success",
                title: `Status Transaksi Berhasil diUpdate`,
            });
            dispatch(getAllTransaction());
            // window.history.go();
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