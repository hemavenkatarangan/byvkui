import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import $ from "jquery";
import { Modal, Button, Table,  Tag } from "antd";

function Nav() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [admins, setAdmins] = useState([
    "jyoti.byvk@gmail.com",
    "hema.s.kasturi@gmail.com",
    "divakarvishwamithra@gmail.com",
    "lohith88@gmail.com",
  ]);
  const [adminAuth, setAdminAuth] = useState(false);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useEffect(() => {
    getCoursesData();
  }, []);

  const getCoursesData = () => {
    axios
      .get("/courses")
      .then((res) => {
        setCourses(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOutUserFromPanel = () => {
    dispatch(logoutUser());
  };

  const toggler = () => {
    $(".offcanvas-collapse").toggleClass("open");
  };

const viewProfile = () => {
	setIsModalVisible(true);
}

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light">
      <div className="container">
        <a
          className="navbar-brand logo-image"
          href="/"
          style={{ marginLeft: "12px" }}
        >
          {/* <img src="../images/logo.png" alt="Bharat Yoga Vidya Kendra" />
                    <b>Bharat Yoga Vidya Kendra</b> */}
          {/* <b className="subtext">An Initiative Of Satsang Foundation</b> */}

          <div className="row">
            <div className="col">
              <img src="../images/logo.png" alt="Bharat Yoga Vidya Kendra" />
            </div>
            <div
              className="col"
              style={{ marginLeft: "-28px", marginTop: "10px" }}
            >
              <div className="row">
                <b
                  style={{
                    padding: "3px",
                    color: "darkblue",
                    fontWeight: "bold",
                    lineHeight: "normal",
                    fontFamily: "Droid Serif",
                    fontSize: "18px",
                  }}
                >
                  Bharat Yoga Vidya Kendra
                </b>
              </div>
              <div className="row">
                <b
                  style={{
                    color: "gray",
                    fontSize: ".85rem",
                    fontFamily: "Droid Serif",
                    fontStyle: "italic",
                    marginLeft: ".2rem",
                    fontSize: "12px",
                  }}
                >
                  Lokah Samastah Sukhino Bhavantu
                </b>
              </div>
            </div>
          </div>
        </a>

        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          data-toggle="offcanvas"
          id="navbarBut"
          onClick={(e) => toggler(e)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="navbar-collapse offcanvas-collapse"
          id="navbarsExampleDefault"
        >
          <ul className="navbar-nav ml-auto" style={{ fontFamily: "Poppins" }}>
            <li className="nav-item">
              <a
                className="nav-link page-scroll"
                style={{ color: "black", fontSize: "14px" }}
                href="/"
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link page-scroll"
                style={{ color: "black", fontSize: "14px" }}
                href="/about"
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link page-scroll"
                style={{ color: "black", fontSize: "14px" }}
                href="/srim"
              >
                Sri M
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                id="dropdown01"
                style={{ color: "black", fontSize: "14px" }}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Courses
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                {courses.map((data, index) => {
                  if (data.isActive) {
                    return (
                      <>
                        <a
                          className="dropdown-item page-scroll"
                          style={{ color: "black", fontSize: "14px" }}
                          href={"../course/" + data._id}
                        >
                          {data.course_name} - {data.course_title}
                        </a>
                        <div className="dropdown-divider"></div>
                      </>
                    );
                  }
                })}
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link page-scroll"
                style={{ color: "black", fontSize: "14px" }}
                href="/careers"
              >
                Careers
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link page-scroll"
                style={{ color: "black", fontSize: "14px" }}
                href="/contactus"
              >
                Contact Us
              </a>
            </li>
            {/* <li  className="nav-item dropdown"> */}
            {isAuthenticated && user.userData.roles[0] === "ADMIN" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="dropdown01"
                  style={{ color: "black", fontSize: "14px" }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/coursedashboard"
                  >
                    Course Dashboard
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/programdashboard"
                  >
                    Events Dashboard
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/mediadashboard"
                  >
                    Media Dashboard
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/userquery"
                  >
                    Query Data
                  </a>
                  <div className="dropdown-divider"></div>
                </div>
              </li>
            ) /*: isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/mydashboard"
                  >
                    Your Data
                  </a>
                </li>
              </>
            ) */
            : 
            (
              <></>
            )}
            {/* </li> */}
              {isAuthenticated ? (
                <>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="dropdown01"
                  style={{ color: "black", fontSize: "14px",backgroundColor:"rgb(255,219,88)",borderRadius:"20px" }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/completeprofile"
                  >
                    Comple your profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    onClick={viewProfile}>
                    View Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    href="/yourregistrations"
                  >
                    Your Registrations
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item page-scroll"
                    style={{ color: "black", fontSize: "14px" }}
                    onClick={(e) => logOutUserFromPanel(e)}
                  >
                    Logout
                  </a>
       
                </div>
              </li>
              <Modal
		        title="Profile Details"
		        width="75%"
		        visible={isModalVisible}
		        onCancel={handleCancel}
		        onOk={handleCancel}
		      >
                <div className="form-group">
		          <input
		            type="text"
		            className="form-control-input notEmpty"
		            value=""
		            id="course_name"
		            required
		          />
		          <label className="label-control" htmlFor="name">
		            Course Name
		          </label>
		         
		        </div>
      			</Modal>
                </>
              ) : (
				<li>
                <div>
                  <span className="nav-item">
                    <a className="btn-solid-sm page-scroll" href="/login">
                      Sign In
                    </a>
                  </span>
                </div>
                </li>
                
              )}
            <li>
              <img
                style={{ height: "32px" }}
                src="/images/logosatsang1.png"
                alt="byvk"
              ></img>
            </li>
           
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Nav;
