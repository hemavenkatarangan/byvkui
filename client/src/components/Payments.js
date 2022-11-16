import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { openNotificationWithIcon } from "./Notifications";
import fileUploadUrl from "../constants/constants";
import axios from "axios";

function Payments(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [activateButton, setActivateButton] = useState(true);
  const [url, setUrl] = useState("");
  
  const search = window.location.search; // returns the URL query String
  const params = new URLSearchParams(search);
  const feesFromURL = params.get("fees");
  const feesUSDFromURL = params.get("usdfees");
  const courseNameFromURL = params.get("course_name");
  const uname = params.get("user_name");
  console.log("Uname "+uname);
  const c_id = params.get("c_id");
  const um_id = params.get("userManagementId");
  console.log("Umid"+um_id);
  const [errObj] = useState({
    whompayment: "",
  });
  const errStyle = {
    color: "red",
    textAlign: "center",
    fontSize: ".7rem",
  };

  const onProgramChange = (e) => {
    console.log(e);
  };
  useEffect(() => {
    console.log(user);
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const onFileChange = (e) => {
    // console.log(e.target.files);
    if (
      e.target.files[0].type === "application/pdf" ||
      e.target.files[0].type === "application/x-zip-compressed" ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      var form = new FormData();
      form.append("course_name", courseNameFromURL);
      // for (let i = 0; i < e.target.files.length; i++) {
      form.append("files", e.target.files[0]);
      // }

      axios
        .post(fileUploadUrl, form)
        .then((res) => {
          console.log(res);
          setUrl(res.data.result[0]);
          setActivateButton(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(`Sorry the format which you selected is not supported.`);
    }
  };

  const submitPaymentData = () => {
    let obj = {
      user_id: user.user.id,
      email_id: user.user.name,
      payment_path: url,
      program_id: c_id,
      user_name: uname,
    };
    axios
      .post("/payments/", obj)
      .then((res) => {
	    //
	     let obj = {
      status: "REGISTERED",
    };
	  axios
      .patch("/usermanagement/status/" + um_id, obj)
      .then((res) => {
        if (res.data.status_code === "200") {
          openNotificationWithIcon({
            type: "success",
            msg: "User Status",
            description: res.data.status_message,
          });
         //
        alert(
          "Thank You !! will let you know the status Please visit payment dashboard in sometime.!"
        );
        setTimeout(() => {
          window.location.href = "/home";
        }, 300);
        
         //SEnding mail
    var mailObject = {
	to_address:user.userData.email_id,
	subject:"Received the Payment for the Event "+courseNameFromURL,
	email_body:"",
	name:uname,
	course:courseNameFromURL
}
          axios
      .post("/mailservice/sendmailforpayments", mailObject)
      .then((res) => {
	
	console.log(res);
	});
          //Sending mail
        }
        else
        {
	 alert(
          "Failed Registering, Check with Administrator!!!"
        );
}
      })
      .catch((err) => {
        console.log(err);
      });
	    
	   
      })
      .catch((err) => console.log(err));
  };

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
                <p
                  className=""
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    color: "orange",
                  }}
                >
                  India & Non Indian Residents Fund Transfer
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                  Please transfer amount {feesFromURL} {"\u20A8"} for Indian
                  Residents & for Non Indian Residents USD. {feesUSDFromURL}{" "}
                  {"\u0024"} for course {courseNameFromURL} to below account.
                  Please enter the participant's name in the remarks section (in
                  the Bank's NEFT transfer page)
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                  NOTE: Please make sure to save a screenshot of your
                  transaction.
                </p>

                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  Account Name: BHARAT YOGA VIDYA KENDRA
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  Bank Name: Axis Bank
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  Account Number 921010029132727
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  IFSC: UTIB0001854
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  SWIFT CODE: AXISINBBA17
                </p>

                <div className="form-group mt-5">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    id="whompayment"
                    value={uname}
                    onChange={(e) => onProgramChange(e)}
                  />
                  <label className="label-control">
                    For Whom Payment made?
                  </label>
                  <p style={errStyle}>{errObj.whompayment}</p>
                </div>
                
                <div className="form-group mt-5">
                 <label for="fileupload" class="btn" style={{ fontFamily: "Poppins", fontSize: "12px",color:"blue" }}>Upload Payment Screenshot/Image</label>
                  <input
                    type="file"
                    className=""
                    id="fileupload"
                    onChange={(e) => onFileChange(e)}
                    required
                  />
                  
                </div>
                <div className="form-group mt-4">
                  <button
                    type="submit"
                    className="form-control-submit-button"
                    onClick={(e) => submitPaymentData(e)}
                    disabled={activateButton}
                  >
                    Submit
                  </button>
                </div>
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
