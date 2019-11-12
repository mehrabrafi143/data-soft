import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/employee";

export function AddEmployee(data) {
  return http.post(api, data);
}

export function GetEmployee(id) {
  return http.get(api + "/" + id);
}

export function CancleEmployee(id) {
  return http.delete(api + "/" + id);
}

export function GetEmployees() {
  return http.get(api);
}

export function GetExEmployees() {
  return http.get(apiEndpoint + "/api/exemployees");
}

export function GetEmployeeWithCartificates(id) {
  return http.get(apiEndpoint + "/api/employeeWithCertificate?id=" + id);
}

export function GetEmployeeByUserName(userName) {
  return http.get(apiEndpoint + "/api/get?username=" + userName);
}

export function AddWorkingHours(data) {
  return http.post(apiEndpoint + "/api/workinghour", data);
}
