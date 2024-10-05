import axios from "axios";


const axiosinstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-e16e7/us-central1/api",
    baseURL: "https://amazon-backend-api-deploy.onrender.com",
});


export default axiosinstance;
