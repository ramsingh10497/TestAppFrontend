import axios from "axios";
import { loginPath, signupPath, userFetchPath } from "./apiPaths";

const authRequests = async (payload, type, formdata) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const { name, email, password, phone, mobile, zipcode } = payload;

  formdata.append("email", email);
  formdata.append("password", password);

  if (!payload.zipcode) {
    formdata.append("username", payload.email);
  } else {
    formdata.append("name", name);
    phone.length > 0 && formdata.append("phone", phone);
    mobile.length > 0 && formdata.append("mobile", mobile);
    zipcode.length > 0 && formdata.append("zipcode", zipcode);
  }

  const reqOptions = {
    url: type == "register" ? signupPath : loginPath,
    method: "POST",
    headers: headersList,
    data: formdata,
  };

  const response = await axios.request(reqOptions);
  return response.data;
};

const userRequest = async (id) => {
  const headersList = {
    "Accept": "*/*"
   }
   const response = await fetch(`${userFetchPath}/${id}`, {
     method: "GET",
     headers: headersList
   });
   const data = await response.json();
   return data
}

const userUpdate = async (id, userDetail, formdata) => {
  const { name, email, password, phone, mobile, zipcode } = userDetail;
  email && formdata.append("email", email);
  password && formdata.append("password", password);
  name && formdata.append("name", name);
  phone?.length > 0 && formdata.append("phone", phone);
  mobile?.length > 0 && formdata.append("mobile", mobile);
  zipcode?.length > 0 && formdata.append("zipcode", zipcode);
  
  const headersList = {
    "Accept": "*/*"
  }
   const response = await fetch(`${userFetchPath}/${id}`, {
     method: "PUT",
     body: {name: "khjfd"},
     headers: headersList
   });
   const data = await response.json();
   return data
}

module.exports = {
  authRequests,
  userRequest,
  userUpdate
};
