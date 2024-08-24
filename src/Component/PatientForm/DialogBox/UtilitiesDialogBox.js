import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase";

export const validateForm = (formData) => {
  if (!formData.RegistrationNo) {
    return false;
  }
  return true;
};

export const dialogBoxSubmitHandler = async (
  e,
  setModalContent,
  setShowModal,
  formData,
  image,
  id,
  userId,
  documents,
  setDocuments,
  fileInputEvent
) => {
  e.preventDefault();
  if (!validateForm(formData)) {
    setModalContent({
      title: "Error",
      body: "Registration Number is required",
    });
    setShowModal(true);
    return;
  }

  let registrationNo = String(formData.RegistrationNo);
  if (!registrationNo.trim()) {
    setModalContent({
      title: "Error",
      body: "Invalid Registration Number",
    });
    setShowModal(true);
    return;
  }

  setModalContent({
    title: "Processing",
    body: "It's take few seconds to submit the patients data on database.",
  });
  setShowModal(true);

  try {

    if(fileInputEvent){
      const files = Array.from(fileInputEvent.target.files);
      if (files.length > 0) {
        const uploadPromises = files.map((file) => {
          const uniqueFileName = `${file.name}`;
          const folderPath = `PatientsDocuments/${formData.RegistrationNo}/`;
          const uploadedDocument = ref(storage, folderPath + uniqueFileName);
          return uploadBytes(uploadedDocument, file).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          );
        });
  
        const urls = await Promise.all(uploadPromises);
        setDocuments((prevDocuments) => [...prevDocuments, ...urls]);
  
        documents = [...documents, ...urls];
      }
    }
   

    const axiosMethod = id ? axios.put : axios.post;
    const axiosUrl = id
      ? `http://localhost:5000/data/${id}`
      : "http://localhost:5000/insert";

    await axiosMethod(axiosUrl, {
      ...formData,
      userId,
      PatientsDocuments: documents,
      ImageUrl: image,
    });
    setModalContent({
      title: "Success",
      body: "Patient Data successfully submitted.",
    });
    setShowModal(true);
  } catch (error) {
    setModalContent({
      title: "Error",
      body: `Error saving patient data: ${error.message}`,
    });
    setShowModal(true);
  }
};

export const dialogBoxConfirm = (
  setShowModal,
  modalContent,
  history,
  setFormData,
  e
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/patientdata");
    setFormData({
      RegistrationNo: "",
      Name: "",
      FatherName: "",
      Gender: "",
      Address: "",
      RegistrationDate: "",
      MeanOfTransportation: "",
      BroughtBy: "",
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
      ImageUrl: "",
    });
  } else {
    e.preventDefault();
    history.replace("/form");
  }
};
