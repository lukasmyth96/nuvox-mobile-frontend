import axios from 'axios'

const axiosInstance = axios.create({
    // replace with http://192.168.1.193:8000/ for mobile testing.
    baseURL: "http://localhost:8000/"
});

export default axiosInstance;
