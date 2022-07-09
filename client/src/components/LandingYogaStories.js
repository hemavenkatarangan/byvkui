import { useState, useEffect } from "react";
import axios from "axios";

function LandingYogaStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    let obj = {
      media_type: "yogastories",
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
        setStories(mediafiles);

        // setStories(res.data.result[0].media_path)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="slider-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2
                className="heading white-heading"
                style={{
                  color: "darkblue",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                }}
              >
                Yoga Stories
              </h2>
              {/* <p className="p-heading">You can read below a few testimonials from satisfied shop owners. Of course there are also some unhappy ones but they're not here</p> */}
            </div>
          </div>
          <div className="row" style={{ marginTop: "-50px" }}>
            <div className="col-lg-12">
              <div className="slider-container">
                <div className="swiper-container card-slider-tube">
                  <div className="swiper-wrapper">
                    {stories.map((data, index) => {
                      return (
                        <div className="swiper-slide" key={index}>
                          <div className="card">
                            <div className="card-body">
                              <div
                                style={{
                                  border: "1px solid black",
                                  height: "152px",
                                  width: "214px",
                                }}
                              >
                                <iframe
                                  className="youtube-player"
                                  src={data}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
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
        </div>
      </div>
    </>
  );
}

export default LandingYogaStories;
