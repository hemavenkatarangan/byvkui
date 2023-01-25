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
  const mySafeHTML = "";
  useEffect(() => {
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

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
  const getEventsRelatedToThisCourse = (cId, index) => {
    var type = courseType[index - 1];
    console.log(type);
    axios
      .get(`/programs/course/${cId}/programtype/ONLINE`)
      .then((res) => {
        if (res.data.status_code === "200") {
          if (type === courseType[0]) {
            setCourseRelatedData(res.data.result);
            console.log("Got ALL")
          }
          if (type === courseType[1]) {
            setCourseOfflineRelatedData(res.data.result);
            console.log("Got offline")
          } else if (type === courseType[2]) {
            setOnlineCourseData(res.data.result);
            console.log("Got online");
          } else {
            setHybridCourseData(res.data.result);
            console.log("Got hybrid");
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
           {onlineCourseData.length > 0 ? (
            <Collapse defaultActiveKey={["3"]} onChange={onChange} > 
              <Panel header="UpComing Courses" key="3">
                <div className="container">
                 {
                    onlineCourseData.map((data, index) => {
                      return (
                        <>
                        {
                              data.status !== "INACTIVE" &&
                              data.status == "STARTED" &&
                                
                  compareDates(data.program_start_date) && (data.name.includes('YogaM') || data.name.toLowerCase().includes('monthly')|| data.name.toLowerCase().includes('sakhyam'))? (
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
                          //
                            ) : (
                                ""
                              )}
                          <hr style={{ marginTop: "4px" }} />{" "}
                        </>
                      );
                    })
                 }
                </div>
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
