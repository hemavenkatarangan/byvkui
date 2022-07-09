import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getCartItems } from "../actions/authActions";

function Home() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user)
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <div>
      <header id="header" className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-container">
                <h3 className="h3-large" style={{ fontFamily: "Poppins" }}>
                  Thanks for signing up to BYVK!
                </h3>
                <p className="" style={{ fontFamily: "Poppins" }}>
                  We will keep you informed about our ongoing programs and
                  opportunities to learn.
                </p>
                <p style={{ fontFamily: "Poppins" }}>
                  To learn more about BYVK please go to our{" "}
                  <a href="/about">[About Us section]</a>
                </p>
                <p style={{ fontFamily: "Poppins" }}>
                  To learn more about our courses, please go to our Courses
                  section <a href="/#courses">[Courses section]</a>
                </p>
                <p style={{ fontFamily: "Poppins" }}>
                  Warmly, <br />
                  BYVK Team
                </p>
                {/* {isAuthenticated ?<a className="btn-solid-lg" onClick={(e) => dispatch(logoutUser())}>Logout</a> : <a className="btn-solid-lg" href="/login">Login</a>} */}
                {/* <a className="btn-outline-lg page-scroll" href="/">Home</a> */}
              </div>
            </div>
            {/* <div className="col-lg-7">
                            <div className="image-container">
                                <img className="img-fluid" src="images/header.png" alt="alternative" />
                            </div> 
                        </div> */}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
