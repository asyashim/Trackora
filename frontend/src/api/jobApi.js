import { apiRequest } from "./apiClient";

export const getJobs = async () => {
  return await apiRequest("/jobs");
};