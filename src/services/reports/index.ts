import { promise, promisePaginated } from "../promise";

const ENDPOINT = "/reports";

export const createReport: App.Services.Report.createReport = (data) => {
  return promise((axios) => axios.post(ENDPOINT, data));
};

export const getReports: App.Services.Report.getReports = (params) => {
  return promisePaginated((axios) => axios.get(ENDPOINT, { params }));
};

export const resolveReport: App.Services.Report.resolveReport = (id, data) => {
  return promise((axios) => axios.post(`${ENDPOINT}/${id}/resolve`, data));
};