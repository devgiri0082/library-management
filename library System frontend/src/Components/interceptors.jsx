import axios from "axios";
export default function interceptor(history) {
    axios.defaults.baseURL = "http://localhost:3300/";
    axios.interceptors.request.use(
        function (req) {
            console.log(req.method, req.url);
            if (localStorage.getItem("token") === null) {
                console.log("No token found");
            } else {
                req.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
            }
            return req;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        function (response) {
            console.log(response);
            return response;
        },
        function (error) {
            console.log(error.response.status, error.response.status === 401);
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                history.push("/login");
            }
            return Promise.reject(error);
        }
    );
}