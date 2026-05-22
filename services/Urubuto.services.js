import axios from "axios";

export const initiatePayment = async payload => {
    const response = await axios.post(`
        ${process.env.URUBUTO_BASE_URL}/v2/payment/initiate
        `,
    payload,
    {
         headers: {
            Authorization:
               process.env.URUBUTO_API_KEY,

            "Content-Type":
               "application/json"
         }
    }
);

   return response.data;
}

export const verifyPayment = async payload => {
    const response = await axios.post(`
            ${process.env.URUBUTO_BASE_URL}/v2/payment/account-holder/validate`,
            payload,
            {
                headers: {
                    Authorization:
                        process.env.URUBUTO_API_KEY,
                    "Content-Type": 
                        "application/json"
                }
            }
        )
}