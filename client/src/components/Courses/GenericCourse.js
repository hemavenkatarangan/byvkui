import axios from "axios";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";

function GenericCourses() {
  const [data, setData] = useState({});

  useEffect(() => {
    var idFind = window.location.href.split("/");
    var id = idFind[idFind.length - 1];
    axios
      .get("/courses/" + id)
      .then((res) => {
        // console.log(res.data)
        setData(res.data.result);
      })
      .catch((err) => console.error(err));
  }, []);
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
          <div className="row">
            <div class="editor-container">
              <ReactQuill
                value={data.contents || ""}
                readOnly={true}
                theme={"bubble"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenericCourses;
