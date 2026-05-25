const validatePhone = (phone) => {

   const regex = /^7\d{8}$/;

   return regex.test(phone);

};

export default validatePhone;