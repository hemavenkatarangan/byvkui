import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function ContactUs() {
  const [contact, setContact] = useState({
    name: "",
    address: "",
    email: "",
    query: "",
    courseName: "",
    phonenumber: "",
  });
  const [errObj, setErrObj] = useState({
    name: "",
    address: "",
    email: "",
    query: "",
    courseName: "",
    phonenumber: "",
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/courses").then((resp) => {
      setCourses(resp.data.result);
    });
  }, []);

  const handleChage = (e) => {
    const { id, value } = e.target;
    setContact((contact) => ({ ...contact, [id]: value }));
  };

  const validateForm = () => {
    let proceed = true;
    const emailRegex = /\S+@\S+\.\S+/;

    if (contact.name.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        name: "Name should be mandatory",
      }));
    }

    if (contact.address.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        address: "Address should be mandatory",
      }));
    }

    if (contact.courseName.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        courseName: "Please select a course name",
      }));
    }

    if (contact.query.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        query: "query should be mandatory",
      }));
    }

    if (contact.email.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        email: "Email should be mandatory",
      }));
    }

    if (!emailRegex.test(contact.email)) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        email: "Please enter valid email id",
      }));
    }

    if (contact.email.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        email: "Email should be mandatory",
      }));
    }

    if (contact.phonenumber.length !== 10) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        phonenumber: "Please enter 10 digit mobile number",
      }));
    }

    if (proceed) {
      submitForm();
      setErrObj((errObj) => ({
        ...errObj,
        name: "",
        address: "",
        email: "",
        query: "",
        phonenumber: "",
      }));
    }
  };

  const submitForm = () => {
    axios
      .post("/contact", contact)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire(
            "YAAY..!",
            "Your query was successfully submitted",
            "success"
          ).then(function () {
            window.location.href = "/";
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="ex-basic-1 pt-4">
        <div className="container">
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="text-container" style={{ marginTop: "45px" }}>
              <h3
                className="h3-large"
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "32px",
                }}
              >
                Contact Us
              </h3>
              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                You may email us at{" "}
                <a
                  href="mailto:bharatyoga@satsang-foundation.org"
                  style={{ color: "darkblue" }}
                >
                  bharatyoga@satsang-foundation.org
                </a>
                , or you may call us on +91-8999-039-823 during office hours
                (10am-5pm IST).
              </p>
              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                If you wish to leave us a message or have any queries, please
                fill out the form at below link:
              </p>
              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                {/* <a href="https://forms.gle/rRUATBuuCsy5o8Dn9" style={{color:'darkblue',fontSize:'16px'}}> https://forms.gle/rRUATBuuCsy5o8Dn9</a> */}
              </p>
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 offset-xl-3">
                    <div className="text-box mt-5 mb-5">
                      {/* <p className="mb-4" style={{ fontFamily: 'Poppins'}}>Fill out the form below to sign up for the service. Already signed up? Then just <a className="blue" href="/login">Log In</a></p> */}
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control-input notEmpty"
                          id="name"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="name">
                          Name
                        </label>
                        <p style={errStyle}>{errObj.name}</p>
                      </div>
                      <div className="form-group">
                        <textarea
                          type="textarea"
                          className="form-control-input notEmpty"
                          id="address"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="address">
                          Address
                        </label>
                        <p style={errStyle}>{errObj.address}</p>
                      </div>
                      <div className="form-group">
                        {/* <input type="" className="form-control-input notEmpty" value={program.course} id="course" onChange={(e) => onProgramChange(e)} required /> */}
                        <select
                          className="form-control-input notEmpty"
                          id="courseName"
                          onChange={(e) => handleChage(e)}
                          required
                        >
                          <option value="">Select</option>
                          {courses.map((d, index) => {
                            if (d.isActive) {
                              return (
                                <option value={d.course_name} key={index}>
                                  {d.course_name}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <label className="label-control" htmlFor="courseName">
                          Course Name
                        </label>
                        <p style={errStyle}>{errObj.courseName}</p>
                      </div>
                      <div className="form-group">
                        <textarea
                          type="textarea"
                          className="form-control-input notEmpty"
                          id="query"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="query">
                          Query
                        </label>
                        <p style={errStyle}>{errObj.query}</p>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control-input notEmpty"
                          id="email"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="email">
                          Email
                        </label>
                        <p style={errStyle}>{errObj.email}</p>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control-input notEmpty"
                          id="phonenumber"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="phonenumber">
                          Mobile
                        </label>
                        <p style={errStyle}>{errObj.phonenumber}</p>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control-submit-button"
                          onClick={(e) => validateForm(e)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3
                className="h3-large"
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "24px",
                }}
              >
                Visit Us
              </h3>
              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                You may visit us at the Madanapalle Ashram, however it is
                mandatory to register for your visit.
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                To register, please write to{" "}
                <a
                  href="mailto:mdplcampus@satsang-foundation.org"
                  style={{ color: "darkblue" }}
                >
                  mdplcampus@satsang-foundation.org
                </a>{" "}
                for day visits, accommodation requests and any other queries.
              </p>

              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                <u>Bharat Yoga Vidya Kendra</u>
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                The Satsang Foundation Campus
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                Nakkaladdini, Kumarapuram,
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                Madanapalle, Andhra Pradesh 517325
              </p>

              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                <u>Registered Office</u>
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                The Satsang Foundation Office
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                No 9, Websters Rd, Cox Town,
              </p>
              <p
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                Bengaluru, Karnataka 560005
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
