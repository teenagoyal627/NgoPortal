import React from 'react'
import './FrontPage.css'
import { Link } from "react-router-dom";

const TextFrontPage = () => {
  return (
    <div>
       <header>
        <div className="header-section flex container">
          <div className="header-left">
            <h1>Dedicated to Serving Those in Need</h1>
            <p>
              ‘Anandam’ – A home for the homeless, was set up to support
              unidentified patient. Providing shelter to the homeless and
              chronically sick aligns with our ethical responsibility to care
              for the most vulnerable members of society.
            </p>
            <button className="GetStartButton">
              <Link
                to="/signup"
                style={{ textDecoration: "none"}}
              >
                Get Started
              </Link>
            </button>
          </div>
          <div className="header-right">
            <img src="Images/VijayMandir.jpeg" alt="Home page" />
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="features-header flex">
            <h4 className="features-heading-text">
              Providing Essential Support: Shelter, Medicine, and Food.
            </h4>{" "}
          </div>
          <hr />
          <div className="features-area flex">
  <a href="https://sapnaindia.org/anandam-home-for-the-homeless/" target="blank" className="features-card card-1">
    <h5 className="features-text">
      SAPNA created its first home for the homeless at Vijay Mandir, Alwar in 2007.
    </h5>
  </a>

  <a href="https://sapnaindia.org/anandam-noida/" target="blank" className="features-card card-2">
    <h5 className="features-text">
    Anandam, our Noida hospice has embraced the dire needs of severely sick patients.
        </h5>
  </a>

  <a href="https://sapnaindia.org/construction-of-anandam-kaduki/" target="blank" className="features-card card-3">
    <h5 className="features-text">
    The structure of Anandam – our 140 bedded home for the homeless has been successfully completed.
    </h5>
  </a>

  <a href="https://sapnaindia.org/anandam-dadikar-alwar/" target="blank" className="features-card card-4">
    <h5 className="features-text">
    Anandam, Dadikar was inaugurated on 18th November, 2017. 
    </h5>
  </a>

  <a href="https://sapnaindia.org/anandam-dadikar-alwar/" target="blank" className="features-card card-5">
    <h5 className="features-text">
    Dadikar facility has a capacity of 70 homeless individuals and currently houses 65.
            </h5>
  </a>

  <a href="https://sapnaindia.org/anandam-dadikar-alwar/" target="blank" className="features-card card-6">
    <h5 className="features-text">
    The Government of Rajasthan has designated it as the ‘Old Age Home’ for the Alwar district.    </h5>
  </a>
</div>

        </div>
      </section>

      <section className="cta-section" style={{marginLeft:"5rem",marginRight:"5rem"}}>
  <div className="container flex cta-section-container">
    {/* <h2 style={{ color: "white" }}>Join Us in Making a Difference</h2> */}
    <div className="card">
      <h5 className="card-header" style={{background:"white"}}>NGO Management System</h5>
      <div className="card-body">
        <p className="card-text">
          Our system allows you to manage patient information efficiently. You can
          record details such as name, father's name, arrival date, referring hospital,
          and more. Click the Signup button to get started and make an impact today.
        </p>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/signup"
            style={{  textDecoration: "none" }}
          >
            Signup
          </Link>
        </button>
        <button className="GetStartButton" style={{marginRight:"3rem"}}>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  </div>
</section>

      <br />
      <br />
    </div>
  )
}

export default TextFrontPage
