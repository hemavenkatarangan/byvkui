import { Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LandingCoursesCalender() {

  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isUserHasRegistered, setUserAlreadyRegistered] = useState(false);

  const [cData, setcData] = useState([]);
  
  const [profileData,setProfileData] = useState({});

const history = useHistory();
	
  useEffect(() => {
   
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useEffect(() => {
    getProgramsData();
    getProfileData();
  }, []);
  
  const getProfileData = () => {
	if(user.userData)
	{
	axios
	.get("/profile/"+user.userData.email_id)
	.then((res) => {
		if(res.data.status_code === "200")
		{
		
		setProfileData(res.data.result[0]);
		}
	})
		.catch((err)=>{
		console.log(err);
		});
		}
		
};

  const getProgramsData = () => {
    axios
      .get("/programs/activeprograms")
      .then((res) => {
	console.log("Data in landing courses ");
	console.log(res.data.result);
	var landingEvents=res.data.result;
        setcData(res.data.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
const getCourse = (courseId) => {
	console.log("Getting course name for "+courseId);
    axios
      .get("/courses?courseId="+courseId)
      .then((res) => {
       console.log("Course name "+res.data.result.course_name);
      return res.data.result.course_name;
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  const getFormatedDate = (date) => {
    // console.log("formatting......")
    return moment(date).format("DD-MMM-YYYY");
  };

  const compareDates = (date) => {
    let today = new Date();
    let startingDay = new Date(date);
    let val = false;
    if (today < startingDay) {
      val = true;
    }
    return val;
  };
  

const validateForCourse = () => {

	if(isAuthenticated){
		console.log(profileData,"Profile data to validate");
		if (profileData.about_byuk == "" || profileData.address_1 == "" || profileData.address_2 == "" || profileData.age == "" || profileData.city == "" || profileData.country == "" || profileData.dob== "" || profileData.email_id == "" || profileData.expert_level == "" || profileData.first_name== "" || profileData.gender == "" || profileData.languages == "" || profileData.last_name == "" || profileData.maritalstatus == "" || profileData.nationality == "" || profileData.occupation == "" || profileData.previous_experience == "" || profileData.qualification == "" || profileData.state == "" || profileData.phone_num == ""){
			return false;
		}else{
			return true;
		}
	}
}

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

                  
                  {
                  data.status !== "INACTIVE" &&
                  data.status == "STARTED" &&
                  
                  compareDates(data.program_start_date) && (data.name.toLowerCase().includes('yogam') || data.name.toLowerCase().includes('monthly') || data.name.toLowerCase().includes('atha yoga')) ? (
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
                  ) : (
                    ""
                  )}
                  {
                  data.status !== "INACTIVE" &&
                  data.status == "STARTED" &&
                  
                  compareDates(data.program_start_date) && (data.name.toLowerCase().includes('sakhyam')||data.name.toLowerCase().includes('kausalam')||data.name.toLowerCase().includes('t t c')) ? (
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
                        {(data.name.toLowerCase().includes('sakhyam'))|| (data.name.toLowerCase().includes('kausalam'))||(data.name.toLowerCase().includes('yogam')) || (data.name.toLowerCase().includes('monthlym')) ? (<a href={"../registercourse/" + data._id}>
                          Register Course
                        </a>):(<a href={"../registercourse/" + data._id} onClick={(e)=>{
							let valid = validateForCourse();
							if (!valid) {
								e.preventDefault();
								alert("Please Complete Your Profile Before Registering To This Event");
								return false;
							}
						}}>
                          Register Course
                        </a>)}
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  
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
