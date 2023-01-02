import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { openNotificationWithIcon } from "./Notifications";
import fileUploadUrl from "../constants/constants";
import axios from "axios";

function Payments(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [activateButton, setActivateButton] = useState(false);
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
          setActivateButton(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(`Sorry the format which you selected is not supported.`);
    }
  };

  const submitPaymentData = () => {
	console.log("Sending payments")
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
          "Congratulations! You are successfully registered for the event. We will get in touch with you within 5 working days"
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
                 {feesFromURL != 0 && (
	<>
                <p
                  className=""
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    color: "orange",
                  }}
                >
                  Indian Residents Fund Transfer
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                Please transfer  {"\u20A8"} {feesFromURL} to the below account. Please enter the participant's name in the remarks section (in the Bank's NEFT transfer page). 
 
              
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                  NOTE: Please make sure to save a screenshot of your
                  transaction.
                </p>

                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "14px" }}
                >
                 <b> Account Name: BHARAT YOGA VIDYA KENDRA</b>
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "14px" }}
                >
                 <b> Bank Name: Axis Bank </b>
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "14px" }}
                >
                 <b> Account Number 921010029132727</b>
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "14px" }}
                >
                 <b> IFSC: UTIB0001854</b>
                </p>
               
                </>
      )}
       {feesUSDFromURL != 0 && (
	<>
                <p
                  className=""
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    color: "orange",
                  }}
                >
                  International Fund Transfer
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                Please transfer USD {feesUSDFromURL} using the link below.  
 
              
                </p>
                <p className="" style={{ fontFamily: "Poppins" }}>
                  NOTE: Please select 'Course Fee' option for the payment type, enter the participant's name in the remarks section (in the Bank's transaction page) and make sure to save a screenshot of your transaction.
                </p>

                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                 It takes seven working days for an international payment to reflect at our end.


                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                 Kindly be patient. 
                </p>
                <p
                  className=""
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                 <a href="https://ind01.safelinks.protection.outlook.com/?url=https%3A%2F%2Feasypay.axisbank.co.in%2FeasyPay%2FmakePayment%3Fmid%3DNTY0MjY%253D&data=04%7C01%7CNarella.Padmaja%40axisbank.com%7Ce12312bb02414e87576208d97aa2c8cf%7C2d538e6436c741bc8b7d4d804956e957%7C0%7C0%7C637675661863167467%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=YmLx79oU%2BVvIykobJJQFfpiso4%2BQ4A2TnFUoHlfBcFE%3D&reserved=0">https://ind01.safelinks.protection.outlook.com/?url=https%3A%2F%2Feasypay.axisbank.co.in%2FeasyPay%2FmakePayment%3Fmid%3DNTY0MjY%253D&data=04%7C01%7CNarella.Padmaja%40axisbank.com%7Ce12312bb02414e87576208d97aa2c8cf%7C2d538e6436c741bc8b7d4d804956e957%7C0%7C0%7C637675661863167467%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=YmLx79oU%2BVvIykobJJQFfpiso4%2BQ4A2TnFUoHlfBcFE%3D&reserved=0</a>
                </p>
               
                </>
      )}
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
                {activateButton ? (
                <div className="form-group mt-4">
                  <button
                    type="submit"
                    className="form-control-submit-button"
                    onClick={(e) => submitPaymentData(e)}
                    
                  >
                    Submit
                  </button>
                </div>
                ):(
				<div className="form-group mt-4">
					<button type="submit" className="form-control" disabled>
						Submit
					</button>
				</div>)}
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
