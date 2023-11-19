import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})

const UsePublicApi = () => {
    return axiosPublic;
};

export default UsePublicApi;