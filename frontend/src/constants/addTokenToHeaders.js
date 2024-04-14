import axios from "axios";

 export const addTokenToHeaders = () => {
    const token = localStorage.getItem('token'); 
    console.log("token from addtoken",token )
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

