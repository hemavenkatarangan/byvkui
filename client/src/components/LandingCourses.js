import axios from "axios";
import { useState, useEffect } from "react";

function LandingCourses() {
  const [courses, setCoursesData] = useState({});

  useEffect(() => {
    axios
      .get("/courses/")
      .then((res) => {
        // console.log(res)
        setCoursesData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2
                className="heading white-heading"
                style={{
                  color: "darkblue",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Our Courses
              </h2>
              <p className="p-heading"></p>
            </div>
          </div>
          <div className="row">
            {courses.length > 0
              ? courses.map((data, index) => {
                  if (data.isActive) {
                    return (
                      <div className="col-lg-4" key={index}>
                        <a href={"../course/" + data._id}>
                          <div className="card">
                            <div
                              className="card-body"
                              style={{ textAlign: "center" }}
                            >
                              <img
                                src={data.course_thumbnail}
                                alt={data.course_name}
                              ></img>
                              <div className="text">
                                <div
                                  className="testimonial-author"
                                  style={{ color: "darkblue" }}
                                >
                                  {data.course_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  }
                })
              : null}

            {/* <div className="col-lg-4">
                                            <a href="../kaushalam">
                                            <div className="card">
                                            <div className="card-body" style={{textAlign: 'center'}}>
                                                    <img src="images/courses/kausalamthumbnail.png" ></img>
                                                    <div className="text">
                                                        <div className="testimonial-author" style={{color:'darkblue'}}>KausalaM</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                            </div>
                                        <div className="col-lg-4">
                                            <a href="ttc">
                                            <div className="card">
                                            <div className="card-body" style={{textAlign: 'center'}}>
                                                    <img src="images/courses/ttcthumbnail.png"></img>
                                                    <div className="text">
                                                        <div className="testimonial-author" style={{color:'darkblue'}}>TTC</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                            </div> */}
          </div>
          {/* <div className="row" style={{marginTop:'30px'}}>
                        <div className="col-lg-4">
                                        <a href="/abhayam">
                                            <div className="card">
                                                <div className="card-body" style={{textAlign: 'center'}}>
                                                    <img src="images/courses/abhayamthumbnail.png"></img>
                                                    <div className="text">
                                                        <div className="testimonial-author" style={{color:'darkblue'}}>AbhayaM</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                            </div>
                                        <div className="col-lg-4">
                                            <a href="/avistaran">
                                            <div className="card">
                                            <div className="card-body" style={{textAlign: 'center'}}>
                                                    <img src="images/courses/avistaranthumbnail.png" ></img>
                                                    <div className="text">
                                                        <div className="testimonial-author" style={{color:'darkblue'}}>Avistaran</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                            </div>
                                        <div className="col-lg-4">
                                            <a href="/sakhyam">
                                            <div className="card">
                                            <div className="card-body" style={{textAlign: 'center'}}>
                                                    <img src="images/courses/upcoming.png"></img>
                                                    <div className="text">
                                                        <div className="testimonial-author" style={{color:'darkblue'}}>SakhyaM</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                            </div>

                        </div> */}
        </div>
      </div>
    </>
  );
}

export default LandingCourses;
