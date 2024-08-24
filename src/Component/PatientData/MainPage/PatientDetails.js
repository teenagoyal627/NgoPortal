import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./PatientData.css";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import {
  closeModal,
  deleteHandler,
  editHandler,
  printHandler,
} from "../Utilities/PatientDataUtilities";
import TableFormate from "../TablePatientData/TableFormate";
import PrintModal from "../TablePatientData/PrintModal";
import FilterData from "../Filter/Filter";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PrintTable from "../TablePatientData/PrintTable";

const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
const[userId,setUserId]=useState(null)
  const history = useHistory();
  const printTableRef=useRef(null)
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        document.cookie = `userId=${user.uid};path=/; max-age=86400; SameSite=None; Secure`;
      }
      else{
        console.log("error in storeing the cookies")
      }
      setUserId(user.uid)
    })
    if (userId) {
      axios
        .get(`http://localhost:5000/data`, {
          params: { userId },
        })

        .then((response) => {
          setPatients(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
   
    return()=>unsubscribe

  }, [auth,userId]);

  return (
    <>
      <OtherPageNavbar />
      <FilterData patients={patients} setPatients={setPatients} />
      <PrintTable printTableRef={printTableRef} />
      <TableFormate
        patients={patients}
        editHandler={(id) => editHandler(id, history)}
        printHandler={(patient) =>printHandler(patient, setSelectedPatient, setShowModal) }
        deleteHandler={(id) => deleteHandler(id, setPatients)}
        printRef={printTableRef}
      />
      <PrintModal
        selectedPatient={selectedPatient}
        closeModal={() => closeModal(setShowModal, setSelectedPatient)}
        showModal={showModal}
      />
    </>
  );
};

export default AllPatientDetails;
