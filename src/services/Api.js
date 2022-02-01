
import axios from "axios";
import ApiConfig from "../config/apiConfig"

export const Api = async (endpoint, data, type, user, dispatch, Navigate) => {
  let mainUrl = ApiConfig.mainUrl;
  let token = "";
  if (user) token = user.authorizationtoken;
  var response

  let headers = { "Content-Type": "application/json" };
  try {
    switch (type) {
      case "post":
        headers["Authorization"] = token;
        response = await axios.post(`${mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case "postWithoutToken":
        response = await axios.post(`${mainUrl}/${endpoint}`, data, { headers })
        break;

      case "get":
        headers["Authorization"] = token;
        response = await axios.get(`${mainUrl}/${endpoint}`, { headers });
        break;
      case "getWithoutToken":
        response = await axios.get(`${mainUrl}/${endpoint}`, { headers });
        break;
      case "put":
        headers["Authorization"] = token;
        headers["Content-Type"] = "multipart/form-data";
        response = await axios.put(`${mainUrl}/${endpoint}`, data, { headers });
        break;
      case "patch":
        headers["Authorization"] = token;
        response = await axios.patch(`${mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case "delete":
        headers["Authorization"] = token;
        response = await axios.delete(`${mainUrl}/${endpoint}`, {
          data,
          headers,
        })
        break;
      default:
        return true;
    }
  } catch (error) {
    if (error) {
      response = error.response;
      if (error.status == 401 || response.status == 401) {
        dispatch({ type: "LOGOUT" });
        Navigate('/login');
      }
      if (error.status == 404 || response.status == 404) {
        Navigate('/');
      }
    }
  }
  return response;
};
