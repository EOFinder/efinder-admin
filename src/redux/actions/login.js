import Swal from "sweetalert2";
// import jwt_decode from "jwt-decode";
export const LOGIN = "LOGIN";

export const login = (formData, history) => async () => {
    try {
        const url = process.env.REACT_APP_API_URL;;
        const options = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json",
            },
        };

        const response = await fetch(`${url}/api/admin/login`, options);
        const result = await response.json();
        console.log(result);
        
        if (response.status === 200 ) {
            localStorage.setItem("token", result.token);

            const Toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: "Signed in successfully",
            });
            setTimeout(() => {
                history.push("/dashboard/dashboard");
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Forbidden",
                text: "usename atau password salah",
            });
        }
    } catch (error) {
        localStorage.clear();
        Swal.fire({
            icon: "error",
            title: "Forbidden",
            text: "usename atau password salah",
        });
    }
};
export const logout = (history) => async () => {
    Swal.fire({
        icon: "success",
        title: "Terimakasih",
    });
    localStorage.removeItem("token");
    history.push("/");
};