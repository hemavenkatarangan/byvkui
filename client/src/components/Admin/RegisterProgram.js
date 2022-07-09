import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import fileUploadUrl from "../../constants/constants";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function RegisterProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [programData, setProgramData] = useState([]);
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
  const [docs, setDocs] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    // console.log(Country.getAllCountries());
    // console.log(State.getStatesOfCountry("AF"));
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    // if (props.match.params.id) {
    //   getProgramDataBasedOnId(props.match.params.id);
    // }
    getProgramData();
    updateStateCityCounty();
    // getDataForUploadDocs();
  }, []);

  const updateStateCityCounty = () => {
    setCountry(Country.getAllCountries());
    // console.log(country);
  };

  const getProgramData = () => {
    axios.get("/programs/" + props.match.params.id).then((res) => {
      if (res.data.status_code === "200") {
        setProgramData(res.data.result);
        setDocs(res.data.result.required_documents);
      }
    });
  };

  const onProgramChange = (e) => {
    const { id, value } = e.target;
    if (id === "country" || id === "state") {
      getDataBasedOnSelection(id, value);
    } else {
      setProgram((program) => ({ ...program, [id]: value }));
    }
  };

  const getDataBasedOnSelection = (id, value) => {
    if (id === "country") {
      setStates(State.getStatesOfCountry(value));
      // console.log(states);
    } else if (id === "state") {
      setCity(City.getCitiesOfState(program.country, value));
      // console.log(city);
    }
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
        // console.log(res);
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          setTimeout(function () {
            window.location.href = "/home";
          }, 300);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const arr = [];

  const onFileChange = (e) => {
    // console.log(e.target.files);
    if (
      e.target.files[0].type === "application/pdf" ||
      e.target.files[0].type === "application/x-zip-compressed" ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      var form = new FormData();
      form.append("course_name", e.target.id);
      // for (let i = 0; i < e.target.files.length; i++) {
      form.append("files", e.target.files[0]);
      // }

      axios
        .post(fileUploadUrl, form)
        .then((res) => {
          let obj = {
            document_path: res.data.result[0],
            document_type: e.target.id,
            user_id: user.userData._id,
            program_id: props.match.params.id,
            email_id: user.userData.email_id,
            document_format: "doc",
          };
          arr.push(obj);
          uploadDoctoDatabase(obj);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(
        `Sorry ${user.userData.first_name} the format which you selected ${e.target.files[0].type} is not supported.`
      );
    }
  };

  const uploadDoctoDatabase = (obj) => {
    axios
      .post("/userdocuments/", obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
                  value={programData.name}
                  id="programName"
                  // onChange={(e) => onProgramChange(e)}
                  required
                  disabled
                />
                <label className="label-control" htmlFor="name">
                  Program Name
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={user.userData.first_name}
                  id="userName"
                  onChange={(e) => onProgramChange(e)}
                  required
                  disabled
                />
                <label className="label-control" htmlFor="name">
                  Name
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={user.userData.email_id}
                  id="email"
                  onChange={(e) => onProgramChange(e)}
                  required
                  disabled
                />
                <label className="label-control" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={user.userData.phone_num}
                  id="phoneNum"
                  onChange={(e) => onProgramChange(e)}
                  required
                  disabled
                />
                <label className="label-control" htmlFor="phone">
                  Phone Number
                </label>
              </div>
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
                <select
                  className="form-control-input notEmpty"
                  id="country"
                  onChange={(e) => onProgramChange(e)}
                  value={program.country}
                  required
                >
                  {country.map((country, index) => {
                    return (
                      <option value={country.isoCode} key={index}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.country}
                  id="country"
                  onChange={(e) => onProgramChange(e)}
                  required
                /> */}
                <label className="label-control" htmlFor="max_age">
                  Country
                </label>
                <p style={errStyle}>{errObj.country}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="state"
                  onChange={(e) => onProgramChange(e)}
                  value={program.state}
                  required
                >
                  {states.map((state, index) => {
                    return (
                      <option value={state.isoCode} key={index}>
                        {state.name}
                      </option>
                    );
                  })}
                </select>
                <label className="label-control" htmlFor="min_age">
                  State
                </label>
                <p style={errStyle}>{errObj.state}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="city"
                  onChange={(e) => onProgramChange(e)}
                  value={program.city}
                  required
                >
                  {city.map((city, index) => {
                    return (
                      <option value={city.name} key={index}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
                <label className="label-control" htmlFor="program_fee">
                  City
                </label>
                <p style={errStyle}>{errObj.city}</p>
              </div>
              <p style={errStyle}>
                Please upload documents carefully, once you uploaded its not
                able to replace. use (Jpeg/png/pdf/zip)
              </p>
              {docs.map((data, index) => {
                return (
                  <div className="row" style={{ padding: "10px" }} key={index}>
                    <div className="col-xl-8">Please upload {data}</div>
                    <div className="col-xl-4">
                      <input
                        type="file"
                        className=""
                        id={data}
                        onChange={(e) => onFileChange(e)}
                        required
                      />
                    </div>
                    {/* <label className="label-control" htmlFor="max_age">
                      {data} Upload
                    </label> */}
                    {/* <p style={errStyle}>{errObj.country}</p> */}
                  </div>
                );
              })}
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
