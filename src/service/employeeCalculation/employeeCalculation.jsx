import http from "../http";
import { apiEndpoint } from "../config.json";

export function GetEmployeeCaculation() {
  return http.get(apiEndpoint + "/api/calculateEmployees");
}
