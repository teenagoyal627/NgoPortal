import React, { useState } from 'react';
import SapnaLogo from './Logo/SapnaLogo.png';
import { Link } from "react-router-dom";
import './FrontPageNavbar.css'
import { MessageBox } from '../MessageBox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const OtherPageNavbar = () => {
  const[showModal,setShowModal]=useState(false)
  const[modalContent,setModalContent]=useState({
    title:"",
    body:""
  })
  const history=useHistory()
const handleClick=()=>{
  console.log("logout button")
  setModalContent({
    title:"Logout",
    body:"Do you really want to logout form dashboard."
  })
  setShowModal(true)
}
const handleConfirm=()=>{
  localStorage.clear()
  sessionStorage.clear()
  history.replace('/login')
}
  return (
    <header className='header'>
      <div className='logo-container'>
        <Link to='/ngoPage' className='logo-link'>
          <img src={SapnaLogo} alt='logo of ngo' className='logo-image' />
          <h3 className='ngo-name'>Anandam-home for the homeless</h3>
        </Link> 
      </div>
      <nav>
        <ul>
          <li><Link to='/form' className="link">Details Form</Link></li>
          <li><Link to='/patientdata' className="link">All Patients Details</Link></li>

         <li className='link' onClick={handleClick}>Logout</li>
        </ul>
      </nav>
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={()=>handleConfirm()}
        title={modalContent.title}
        body={modalContent.body}
      />
    </header>
  );
}

export default OtherPageNavbar;
