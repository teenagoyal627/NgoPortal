import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import Pagination from "../Pagination/Pagination";

const TableFormate = ({
  patients,
  editHandler,
  printHandler,
  deleteHandler,
  printRef,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = patients.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(patients.length / recordsPerPage);
  const numbers = [...Array(numberOfPages).keys()].map((n) => n + 1);
  const startIndex = (currentPage - 1) * recordsPerPage;

  return (
    <>
      <div ref={printRef} className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Registration No</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Registration Date</th>
              <th>Mean Of Transportation</th>
              <th>Brought By</th>
              <th>Patient Condition</th>
              <th>Language Known</th>
              <th>Hospital Department</th>
              <th>Anandam Center</th>
              <th>Sent To Home</th>
              <th>OPD</th>
              <th>Inmate Number</th>
              <th>IO Number</th>
              <th>IO Name</th>
              <th>Aadhar Number</th>
              <th>Image</th>
              <th>Uploaded Documents</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {records.map((patient, index) => {
             
              return (
                <tr key={`${index}`}>
                  <td>{startIndex + index + 1}</td>
                  <td>{patient.RegistrationNo}</td>
                  <td>{patient.Name}</td>
                  <td>{patient.FatherName}</td>
                  <td>{patient.Gender}</td>
                  <td>{patient.Address}</td>
                  <td>{patient.RegistrationDate}</td>
                  <td>{patient.MeanOfTransportation}</td>
                  <td>
                    {`${patient.BroughtBy?.Name || "..."}, ${
                      patient.BroughtBy?.Address || "..."
                    }, ${patient.BroughtBy?.MobileNumber || "..."}, ${
                      patient.BroughtBy?.Aadhar || "..."
                    }`}
                  </td>
                  <td>{patient.PatientCondition}</td>
                  <td>{patient.LanguageKnown}</td>
                  <td>{patient.HospitalDepartment}</td>
                  <td>{patient.AnandamCenter}</td>
                  <td>{patient.SentToHome}</td>
                  <td>{patient.OPD}</td>
                  <td>{patient.InmateNumber}</td>
                  <td>{patient.IONumber}</td>
                  <td>{patient.IOName}</td>
                  <td>{patient.AadharNumber}</td>
                  <td>
                    {patient.ImageUrl && (
                      <img
                        src={patient.ImageUrl}
                        height="200px"
                        width="200px"
                        alt="Patient"
                      />
                    )}
                  </td>
                  <td>
                    {patient.PatientsDocuments.map(
                      (docUrl, docIndex) => (
                        <div key={docIndex}>
                          <a
                            href={docUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Document {docIndex + 1}
                          </a>
                        </div>
                      )
                    )}
                  </td>
                  <td onClick={() => editHandler(patient._id)}>
                    <FaEdit className="icon" />
                  </td>
                  <td onClick={() => deleteHandler(patient._id)}>
                    <MdDelete className="icon" />
                  </td>
                  <td onClick={() => printHandler(patient)}>
                    <FaPrint className="icon" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        numbers={numbers}
      />
    </>
  );
};

export default TableFormate;
