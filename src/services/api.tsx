import axios from 'axios';
//mock api for now
// const BASE_URL = 'https://api-url.com/api/v1';
// for mock data 3amlo fady

const BASE_URL = '/mock-api';
export const fetchData = async (url: string, method = 'GET', data: any = null) => {
  try {
    const fullUrl = `${BASE_URL}/${url}`;
    console.log(`Fetching data from: ${fullUrl}`);
    const response = await axios({
      url: fullUrl,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};
//3shan multiple componenets in one page
export const fetchPageConfig = (pageName: string) => {
  return fetchData(`page-config/${pageName}`, 'GET');
};

// export const loadForm = (model:any) => fetchData(`load/new_form/${model}`, 'POST');
export const loadForm = async (modelName: string) => {
  try {
    const url = `${modelName}.json`;
    console.log("Fetching form data from:", url);
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error loading form data:", error);
    throw error;
  }
};

// export const loadPageConfig = (pageName: string) => {
//   return fetch(`/mock-api/${pageName}.json`).then((res) => {
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   });
// };

// export const loadPageConfig = async (pageName: string) => {
//   const response = await axios.get(`${BASE_URL}/mock-api/${pageName}.json`);
//   return response.data;
// };
// export const loadPageConfig = async (pageName: string) => {
//   const response = await axios.get(`/mock-api/${pageName}.json`);
//   return response.data;
// };
// export const loadPageConfig = async (pageName: string) => {
//   const url = `/mock-api/${pageName}.json`;
//   console.log("Fetching page config from:", url);
//   const response = await axios.get(url);
//   return response.data;
// };
export const loadPageConfig = async (pageName: string) => {
  try {
    const url = `${pageName}.json`;
    console.log("Fetching page config from:", url);
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error loading page configuration:", error);
    throw error;
  }
};

// export const saveForm = (model:any, data:any) => fetchData(`save/new_form/${model}`, 'POST', data);
// export const updateForm = (model:any, id:any, data:any) => fetchData(`save/form/${model}/${id}`, 'PUT', data);
// export const getList = (model:any, filters:any) => fetchData(`load/list/${model}`, 'POST', filters);
// export const getReport = (reportName:any) => fetchData(`report/${reportName}`, 'POST');
// export const getDashboard = (dashboardName:any) => fetchData(`dashboard/${dashboardName}`, 'POST');
// Save form data
export const saveForm = (model: string, data: any) => fetchData(`save/new_form/${model}`, 'POST', data);

// Update form data
export const updateForm = (model: string, id: string, data: any) => fetchData(`save/form/${model}/${id}`, 'PUT', data);

// Fetch list data
export const getList = async (endpoint: string) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    console.log("Fetching list data from:", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching list data:", error);
    throw error;
  }
};

// Fetch report data
export const getReport = (reportName: string) => fetchData(`report/${reportName}`, 'POST');

// Fetch dashboard data
export const getDashboard = (dashboardName: string) => fetchData(`dashboard/${dashboardName}`, 'POST');

