import axios from 'axios';

// const APIRoute = "https://ecommerceebackend.herokuapp.com";
const APIRoute = "http://localhost:4000";

export const API = axios.create({ baseURL: `${APIRoute}` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.Authorization = `${localStorage.getItem("token")}`;
    }
    return req;
});