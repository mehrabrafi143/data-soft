import React from "react";

const CertificateTable = ({ certificates }) => {
  const renderCertificate = id => {
    if (id === 1) return "SSC";
    if (id === 2) return "HSC";
    if (id === 3) return "B.SC";
    if (id === 4) return "M.SC";
    if (id === 5) return "BBA";
  };
  return (
    <div className="row">
      <div className="col-4">
        <div className="section-top-title mt-md">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i> Certificates
          &amp; Grade Information
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map(certificate => {
              return (
                <tr>
                  <td>{renderCertificate(certificate.certificateId)}</td>
                  <td>{certificate.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateTable;
