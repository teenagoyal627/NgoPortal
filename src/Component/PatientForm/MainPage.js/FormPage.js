import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import FormFields from "../FormFields/FormFields";
import {
  handleImageChange,
  formChangeHandler,
  formConfirmHandler,
} from "../Utilities/FormUtilities";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import '../FormFields/Form.css'

const Form = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    RegistrationNo: "",
    Name: "",
    FatherName: "",
    Gender: "",
    Address: "",
    RegistrationDate: "",
    MeanOfTransportation: "",
    BroughtBy: {
      Name: "",
      Address: "",
      MobileNumber: "",
      Aadhar: "",
    },
    PatientCondition: "",
    LanguageKnown: "",
    HospitalDepartment: "",
    AnandamCenter: "",
    SentToHome: "",
    OPD: "",
    InmateNumber: "",
    IONumber: "",
    IOName: "",
    AadharNumber: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/data/${id}`)
        .then((response) => {
          setFormData(response.data || {});
          if (response.data.ImageUrl) {
            setImage(response.data.ImageUrl);
          }
         
        })
        .catch((error) => {
          setModalContent({
            title: "Error",
            body: `Error fetching patient data:${error.message}`,
          });
          setShowModal(true);
        });
    }
  }, [id]);

  return (
    <>
      <OtherPageNavbar />
      <FormFields
        handleImageChange={(e) => handleImageChange(formData, id, e, setImage)}
        image={image}
        formData={formData}
        formChangeHandler={(e) => formChangeHandler(e, setFormData, formData)}
        setFormData={setFormData}
        id={id}
      />

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          formConfirmHandler(setShowModal, modalContent, history)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </>
  );
};

export default Form;
