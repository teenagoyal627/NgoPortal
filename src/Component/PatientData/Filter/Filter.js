import React, { useState, useRef, useEffect } from "react";
import ModalFilter from "./ModalFilter";
import { MessageBox } from "../../MessageBox";
import {
  handleDateChange,
  handleGenderChange,
  filterHandler,
} from "../Utilities/FilterUtilities";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// this is for check the cookies data..
// const getCookies = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(';').shift();
//   }
//   return null;
// };

const FilterData = ({ setPatients }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gender: {
      Male: false,
      Female: false,
    },
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [userId, setUserId] = useState(null);

  const history = useHistory();
  const modalRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        document.cookie = `userId=${user.uid};path=/; max-age=86400; SameSite=None; Secure`;
        setUserId(user.uid);
      } else {
        history.replace("/login");
        console.log("error in storing the cookies");
      }
    });
    return () => unsubscribe;
  }, [auth, history]);
  return (
    <div>
      <button
        type="button"
        className="filter_button"
        onClick={() => setShowFilterModal(true)}
      >
        Apply Filter
      </button>
      {showFilterModal && (
        <ModalFilter
          modalRef={modalRef}
          handleClose={() => setShowFilterModal(false)}
          filters={filters}
          handleDateChange={(e) => handleDateChange(e, setFilters, filters)}
          handleGenderChange={(e) => handleGenderChange(e, setFilters, filters)}
          filterHandler={(e) =>
            filterHandler(
              e,
              filters,
              setPatients,
              setModalContent,
              setShowModal,
              setShowFilterModal,
              setFilters,
              userId
            )
          }
        />
      )}
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => setShowModal(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default FilterData;
