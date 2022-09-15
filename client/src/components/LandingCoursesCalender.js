import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

function LandingCoursesCalender() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isUserHasRegistered,setUserAlreadyRegistered] = useState(false);

  const [cData, setcData] = useState([]);

  useEffect(() => {
    // console.log("Logged user ");
    // console.log(user);
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useEffect(() => {
    getProgramsData();
  }, []);

  const getProgramsData = () => {
    axios
      .get("/programs/")
      .then((res) => {
        
        setcData(res.data.result);
        
        cData.map((data, index) => {
	
	     var isUserRegistered=isUserAlreadyRegistered(data._id);
	     console.log("Set user registered");
	     data.isUserRegistered=isUserRegistered;
	    });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isUserAlreadyRegistered = (programId) => {
	console.log("Checking user registration");
    var usl =
      "/usermanagement/program/" + programId + "/user_id/" + user.userData._id;
   
    axios
      .get(
        "/usermanagement/program/" + programId + "/user_id/" + user.userData._id
      )
      .then((res) => {
	
        if (res.data.result.length == 0) {
	     
          setUserAlreadyRegistered(false);
           return false;
        } else {
	console.log("Returning true");
         setUserAlreadyRegistered(true);
         return true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(isUserHasRegistered)
      return isUserHasRegistered;
  };

  const getFormatedDate = (date) => {
    // console.log("formatting......")
    return moment(date).format("DD-MMM");
  };

  return (
    <>
      <div
        className="container"
        style={{
          background:
            "url(../images/header-background.png) center center no-repeat",
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <h2
              className="heading"
              style={{
                color: "darkblue",
                fontFamily: "Poppins",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "24px",
              }}
            >
              Course Calendar
            </h2>
            {/* <p className="p-heading"></p> */}
          </div>
        </div>

        {cData.map((data, index) => {
	console.log(data);
	
	      return (
            <>
       
	
              <div key={index} className="row">
                <div className="col-lg-4" style={{ textAlign: "center" }}>
                  <h5 style={{ fontFamily: "Poppins", fontSize: "16px" }}>
                    {getFormatedDate(data.program_start_date)} {"to"}{" "}
                    {getFormatedDate(data.program_end_date)}
                  </h5>
                  {/* <p style={{fontFamily:'Poppins',fontSize:'16px'}}>{getFormatedDate(data.registration_end_date)}</p> */}
                </div>
                <div className="col-lg-4">
                  <h4
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {data.name}
                  </h4>
                  <p style={{ fontFamily: "Poppins", fontSize: "16px" }}>
                    {data.description} 
                                        
                  </p>
                </div>
                <div className="col-lg-4" style={{ textAlign: "center" }}>
                  <div className="" style={{ marginTop: "0px" }}>
                    <Button
                      type="primary"
                      style={{
                        fontFamily: "Poppins",
                        width: "50%",
                        background: "#f3cd74",
                        color: "black",
                        borderRadius: "18px",
                      }}
                    >
                      <a href={"../course/" + data.course}>Learn More</a>
                    </Button>
                  </div>

                                   
                  {(isAuthenticated &&
                  data.status !== "INACTIVE" &&
                  data.status !== "STARTED" &&
                  !data.isUserRegistered) ? (
                    <div className="" style={{ marginTop: "0px" }}>
                      <Button
                        type="primary"
                        style={{
                          fontFamily: "Poppins",
                          width: "50%",
                          background: "#f3cd74",
                          color: "black",
                          borderRadius: "18px",
                        }}
                      >
                        <a href={"../registercourse/" + data._id}>
                          Register Course
                        </a>
                      </Button>
                    </div>
                  ) : ""}
                </div>
              </div>
              <hr style={{ marginTop: "4px" }} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default LandingCoursesCalender;
