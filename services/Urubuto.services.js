import axios from "axios";

const urubuto = axios.create({
    baseURL: process.env.URUBUTO_BASE_URL,
    headers: {
        Authorization: process.env.URUBUTO_API_KEY,
        "Content-Type": "application/json"
    }
});


export const initiatePayment = async payload => {
    const response = await urubuto.post(`v2/payment/initiate`,payload);
   return response.data;
};

export const verifyPayment = async payload => {
    const response = await urubuto.post(`/v2/payment/transaction/status`, payload);
    return response.data
};