import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import { dialogBoxSubmitHandler, dialogBoxConfirm } from "./UtilitiesDialogBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

// this code is for check that cookies are get or not means userid is stored in cookies or not......
// const getCookies = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
//   return null;
// };

const DialogBox = ({ formData, setFormData, id, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  const [documents, setDocuments] = useState([]);
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  const auth = getAuth();
  const [fileInputEvent, setFileInputEvent] = useState(null);

  useEffect(() => {
    //this is for fetch the documents if id is present
    if (id) {
      axios
        .get(`http://localhost:5000/data/${id}`)
        .then((response) => {
          if (response.data.PatientsDocuments) {
            setDocuments(response.data.PatientsDocuments);
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

    //this is for store the userid in the cookies..
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `userId=${user.uid};path=/; max-age=86400 ; SameSite=None; Secure`;
        setUserId(user.uid);
        // log the stored cookies...
        // const userIdFromCookies = getCookies("userId");
        // if (userIdFromCookies) {
        //   console.log("User ID from cookies:", userIdFromCookies);
        // } else {
        //   console.log("User ID is not stored in cookies.");
        // }
      } else {
        history.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, history, id]);

  const handleDocumentChange = (e) => {
    setFileInputEvent(e);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await dialogBoxSubmitHandler(
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
    );
  };

  return (
    <React.Fragment>
      <label>Upload Documents</label>
      <ul>
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <li key={index}>
              <a href={doc} target="_blank" rel="noopener noreferrer">
                Document {index + 1}
              </a>
            </li>
          ))
        ) : (
          <p>No documents uploaded yet.</p>
        )}
      </ul>

      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleDocumentChange}
      />
      <button onClick={handleClick}>Submit</button>

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={(e) =>
          dialogBoxConfirm(setShowModal, modalContent, history, setFormData, e)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </React.Fragment>
  );
};

export default DialogBox;
