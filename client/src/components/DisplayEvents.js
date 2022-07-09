import axios from "axios";
import { useState, useEffect } from "react";

function DisplayEvents(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/events/${props.match.params.id}`)
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <br />
            <div className="col-xl-12" style={{ textAlign: "center" }}>
              <h1>Events Are Currently Running</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <h1>Events Loaded Here </h1>
      </div>
    </>
  );
}

export default DisplayEvents;
