import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getCartItems } from "../actions/authActions";

function Payments() {
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
               <h1
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "32px",
                }}
              >
                Payments Section
              </h1>
                <p className="" style={{ fontFamily: "Poppins",
                  fontSize: "20px" }}>
                  India Fund Transfer
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                Please transfer amount to below account. Please enter the participant's name in the remarks section (in the Bank's NEFT transfer page)                                                                                                                                                                                                                                                                                                                                                                                                                  
                </p>
<p className="" style={{ fontFamily: "Poppins" }}>NOTE: Please make sure to save a screenshot of your transaction.</p>                                                                                              

<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>Account Name: BHARAT YOGA VIDYA KENDRA</p>
<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>Bank Name: Axis Bank</p>
<p className="" style={{ fontFamily: "Poppins",fontSize: "12px" }}>Account Number 921010029132727</p>
<p className="" style={{ fontFamily: "Poppins",fontSize: "12px" }}>IFSC: UTIB0001854</p>
<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>SWIFT CODE: AXISINBBA17
                </p>
                 <p className="" style={{ fontFamily: "Poppins",
                  fontSize: "20px" }}>
                  Outside India Fund Transfer
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                Please transfer amount to below account. Please enter the participant's name in the remarks section (in the Bank's NEFT transfer page)                                                                                                                                                                                                                                                                                                                                                                                                                  
                </p>
<p className="" style={{ fontFamily: "Poppins" }}>NOTE: Please make sure to save a screenshot of your transaction.</p>                                                                                              

<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>Account Name: BHARAT YOGA VIDYA KENDRA</p>
<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>Bank Name: Axis Bank</p>
<p className="" style={{ fontFamily: "Poppins",fontSize: "12px" }}>Account Number 921010029132727</p>
<p className="" style={{ fontFamily: "Poppins",fontSize: "12px" }}>IFSC: UTIB0001854</p>
<p className="" style={{ fontFamily: "Poppins" ,fontSize: "12px"}}>SWIFT CODE: AXISINBBA17
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
               
              </div>
            </div>
           
          </div>
        </div>
      </header>
    </div>
  );
}

export default Payments;
