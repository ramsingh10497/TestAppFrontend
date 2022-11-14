import axios from "axios";
import { loginPath, signupPath } from "./apiPaths";


const authRequests = async (payload, type, formdata) => {
  
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  formdata.append('name', payload.name)
  formdata.append('email', payload.email)
  formdata.append('password', payload.password)
  formdata.append('phone', payload.phone)
  formdata.append('mobile', payload.mobile)
  formdata.append('zipcode', payload.zipcode)


  if (!payload.zipcode) {
    formdata.append('username', payload.email);
  }

  const reqOptions = {
    url: type == "register" ? signupPath : loginPath,
    method: "POST",
    headers: headersList,
    data: formdata,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

module.exports = {
  authRequests,
};
