import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/employeesPay";

export function EmployeesPay(data) {
  return http.post(api, data);
}
