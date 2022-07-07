import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import axios from "axios";
import moment from "moment";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function RegisterProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [program, setProgram] = useState({
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    status: "REGISTERED",
  });
  const [errObj, setErrObj] = useState({
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    status: "REGISTERED",
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    // if (props.match.params.id) {
    //   getProgramDataBasedOnId(props.match.params.id);
    // }
  }, []);

  const onProgramChange = (e) => {
    const { id, value } = e.target;
    setProgram((program) => ({ ...program, [id]: value }));
  };

  const validateProgramData = () => {
    let valid = true;
    if (program.address_1.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        address_1: "address_1 should be minimum 3 letters",
      }));
    }

    if (program.address_2.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        address_2: "address_2 should be minimum 3 letters",
      }));
    }

    if (program.city.length <= 1) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        city: "city should be mandatory",
      }));
    }

    if (program.state.length <= 1) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        state: "state should be Selected",
      }));
    }

    if (program.country.length <= 1) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        country: "country type should be Selected",
      }));
    }

    if (valid) {
      submitProgram();
      setErrObj((errObj) => ({
        ...errObj,
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        status: "REGISTERED",
      }));
      setProgram((errObj) => ({
        ...errObj,
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        status: "REGISTERED",
      }));
    }
  };

  const submitProgram = () => {
    var obj = {
      program_id: props.match.params.id,
      user_id: user.user.id,
      email_id: user.user.name,
      address_1: program.address_1,
      address_2: program.address_2,
      city: program.city,
      state: program.state,
      country: program.country,
      status: "REGISTERED",
      reject_reason: "",
    };

    axios
      .post("/usermanagement/", obj)
      .then((res) => {
        console.log(res);
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                Register Program
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <div className="text-box mt-5 mb-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.address_1}
                  id="address_1"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="name">
                  Address 1
                </label>
                <p style={errStyle}>{errObj.address_1}</p>
              </div>
              <div className="form-group">
                <input
                  type="textarea"
                  className="form-control-input notEmpty"
                  value={program.address_2}
                  id="address_2"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="description">
                  Address 2
                </label>
                <p style={errStyle}>{errObj.address_2}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.city}
                  id="city"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_fee">
                  City
                </label>
                <p style={errStyle}>{errObj.city}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.state}
                  id="state"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="min_age">
                  State
                </label>
                <p style={errStyle}>{errObj.state}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.country}
                  id="country"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="max_age">
                  Country
                </label>
                <p style={errStyle}>{errObj.country}</p>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control-submit-button"
                  onClick={(e) => validateProgramData(e)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterProgram;
