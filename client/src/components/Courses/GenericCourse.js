import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { Collapse, Card, Button } from "antd";
import moment from "moment";

const { Meta } = Card;
const { Panel } = Collapse;
const courseType = ["ALL","OFFLINE", "ONLINE", "HYBRID"];

//const courseType = ["ALL"];

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function GenericCourses() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState({});
  const [courseId, setCourseId] = useState("");
  const [courseRelatedData, setCourseRelatedData] = useState([]);
  const [courseOfflineRelatedData, setCourseOfflineRelatedData] = useState([]);
  const [onlineCourseData, setOnlineCourseData] = useState([]);
  const [hybridCourseData, setHybridCourseData] = useState([]);
   const [profileData,setProfileData] = useState({});
  const mySafeHTML = "";
  useEffect(() => {
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
     getProfileData();
    var idFind = window.location.href.split("/");
    var id = idFind[idFind.length - 1];
    setCourseId(id);
    axios
      .get("/courses/" + id)
      .then((res) => {
       
        setData(res.data.result);

        getEventsRelatedToThisCourse(id, 3);
      })
      .catch((err) => console.error(err));
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
  
  const onChange = (key) => {
    console.log(key);
    getEventsRelatedToThisCourse(courseId, key[key.length - 1]);
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
  const getEventsRelatedToThisCourse = (cId, index) => {
    var type ="ALL"
    console.log(type);
    
    axios
      .get(`/programs/course/${cId}/programtype/`+type)
      .then((res) => {
        if (res.data.status_code === "200") {
	console.log(res.data.result);
          if (type === "ALL") {
            setCourseRelatedData(res.data.result);
            console.log(res.data.result);
            console.log("Got ALL")
          }
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFormatedDate = (date) => {
    // console.log("formatting......")
    return moment(date).format("DD-MMM-YYYY");
  };

  return (
    <>
      <div className="ex-basic-1 pt-5 pb-5" style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "32px",
                }}
              >
                {data.course_name} {"-"} {data.course_title}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div>
                <div className="slider-container">
                  <div className="swiper-container slide-slider">
                    <div className="swiper-wrapper">
                      {data.carosal_images
                        ? data.carosal_images.map((data, index) => {
                            // console.log(data);
                            return (
                              <div className="swiper-slide" key={index}>
                                <img
                                  src={data}
                                  className="img-fluid"
                                  alt="Byvk"
                                />
                              </div>
                            );
                          })
                        : ""}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: data.contents }} />
          
          
          <div>
           {courseRelatedData.length > 0 ? (
            <Collapse defaultActiveKey={["3"]} onChange={onChange} > 
              <Panel header="UpComing Courses" key="3">
                <div className="container">
                 {
                    courseRelatedData.map((data, index) => {
                      return (
                        <>
                        {
                              
                              data.status == "STARTED" &&
                                
                  compareDates(data.program_start_date) && (data.name.toLowerCase().includes('yoga') || data.name.toLowerCase().includes('monthly')|| data.name.toLowerCase().includes('atha yoga'))? (
	                      <>
                          <div key={index} className="row">
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              <h5
                                style={{
                                  fontFamily: "Poppins",
                                  fontSize: "16px",
                                }}
                              >
                                {getFormatedDate(data.program_start_date)}{" "}
                                {"to"} {getFormatedDate(data.program_end_date)}
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
                                {data.name} - {data.description}
                              </h4>
                            </div>
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              
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
                            
                            </div>
                          </div>
                           <hr style={{ marginTop: "4px" }} />{" "}
                           </>
                        
                            ) : (
                                ""
                              )}
                              {
                  data.status !== "INACTIVE" &&
                  data.status == "STARTED" &&
                  
                  compareDates(data.program_start_date) && (data.name.toLowerCase().includes('sakhyam')||data.name.toLowerCase().includes('kausalam')) ? (
	<>
                          <div key={index} className="row">
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              <h5
                                style={{
                                  fontFamily: "Poppins",
                                  fontSize: "16px",
                                }}
                              >
                                {getFormatedDate(data.program_start_date)}{" "}
                                {"to"} {getFormatedDate(data.program_end_date)}
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
                                {data.name} - {data.description}
                              </h4>
                            </div>
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              
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
                        {(data.name.toLowerCase().includes('sakhyam')) || (data.name.toLowerCase().includes('kausalam'))||(data.name.toLowerCase().includes('yogam')) || (data.name.toLowerCase().includes('monthlym')) ? (<a href={"../registercourse/" + data._id}>
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
                            
                            </div>
                          </div>
                           <hr style={{ marginTop: "4px" }} />{" "}
                           </>
                    
                  ) : (
                    ""
                  )}
                         
                        </>
                      );
                    })
                 }
                </div>
                 <hr style={{ marginTop: "4px" }} />{" "}
                
              </Panel>
              
            </Collapse>
             ) : (
                   ""
                  )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GenericCourses;
