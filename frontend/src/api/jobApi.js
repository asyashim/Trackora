import { apiRequest } from "./apiClient";

export const getJobs = async () => {
  return await apiRequest("/jobs");
};

export const createJob = async (jobData) => {
  return await apiRequest("/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
};