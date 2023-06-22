import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Landing.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AboutInLanding from "./AboutInLanding";
import YogaPhilosophy from "./YogaPhilosophy";
import LandingCourses from "./LandingCourses";
import LandingCoursesCalender from "./LandingCoursesCalender";
import SriMTeachings from "./SriMTeachings";
import LandingYogaStories from "./LandingYogaStories";

function Landing() {
const user = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let obj = {
      media_type: "sliderimages",
    };


    axios
      .post("/mediamanagement/media", obj)
      .then((res) => {
        var mediafiles = new Array();

        for (var i = 0; i < res.data.result.length; i++) {
          var images = res.data.result[i].media_path;
          for (var j = 0; j < images.length; j++) {
            mediafiles.push(images[j]);
            // console.log(images[j]);
          }
        }
        setImages(mediafiles);
        //setImages(res.data.result[0].media_path)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
	
	
    <div className="container">
   
      <div style={{ marginTop: " 100px" }}>
        <div>
         
          <h3
                
                style={{
                  color: "darkblue",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                Welcome {user.user.username} !!!
              </h3>
          <div className="slider-container" >
            <div className="swiper-container slide-slider">
              <div className="swiper-wrapper">
                {images.map((data, index) => {
                  return (
                    <div className="swiper-slide">

                      <img src={data} className="img-fluid" alt="Byvk" />

                    </div>
                  );
                })}
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AboutInLanding />
      </div>
      <div style={{ marginTop: "10px" }}>
        <YogaPhilosophy />
      </div>

      <div id="courses">
        <LandingCourses />
      </div>

      <div style={{ marginTop: "5px" }}>
        <LandingCoursesCalender />
      </div>

      <div>
        <SriMTeachings />
      </div>
      <div>
        <LandingYogaStories />
      </div>
    </div>
  );
}

export default Landing;
