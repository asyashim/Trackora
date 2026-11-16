
import { apiRequest } from "./apiClient";

export const registerUser = async (userData) => {
  return await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (userData)=>{
    return await apiRequest("/auth/login",{
        method:"POST",
        body:JSON.stringify(userData),
    });
};
