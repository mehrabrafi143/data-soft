import http from "../http";
import { apiEndpoint } from "../config.json";

const api = apiEndpoint + "/api/certificate";

export function GetCertificates() {
  return http.get(api);
}

export function AddEmployeeCertificateFun(data) {
  return http.post(apiEndpoint + "/api/addemployeeCertificate", data);
}
