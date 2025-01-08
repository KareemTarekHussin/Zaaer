import axios from 'axios';
//mock api for now
const BASE_URL = 'https://api-url.com/api/v1';

export const fetchData = (url:any, method = 'GET', data = null) => {
  return axios({
    url: `${BASE_URL}/${url}`,
    method,
    data,
  });
};

export const loadForm = (model:any) => fetchData(`load/new_form/${model}`, 'POST');
export const saveForm = (model:any, data:any) => fetchData(`save/new_form/${model}`, 'POST', data);
export const updateForm = (model:any, id:any, data:any) => fetchData(`save/form/${model}/${id}`, 'PUT', data);
export const getList = (model:any, filters:any) => fetchData(`load/list/${model}`, 'POST', filters);
export const getReport = (reportName:any) => fetchData(`report/${reportName}`, 'POST');
export const getDashboard = (dashboardName:any) => fetchData(`dashboard/${dashboardName}`, 'POST');
