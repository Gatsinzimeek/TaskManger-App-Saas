const validatePhone = (phone) => {
  // remove spaces
  let cleaned = phone.replace(/\s+/g, "");

  // convert formats to local 9-digit format
  if (cleaned.startsWith("250")) {
    cleaned = cleaned.replace("250", "");
  } else if (cleaned.startsWith("250")) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }

  // now validate Rwanda format
  const regex = /^7\d{8}$/;
  return regex.test(cleaned);
};

export default validatePhone;