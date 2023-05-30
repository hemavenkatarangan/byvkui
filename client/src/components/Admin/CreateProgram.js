import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Checkbox } from "antd";
import axios from "axios";
import moment from "moment";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

const docsOptions = [
  "AADHAR_CARD",
  "PAN_CARD",
  "COVID_VACINATION_CERTIFICATE",
  "RTPCR",
  "MEDICAL_REPORTS FOR CBC BP ECG",
  "PASSPORT",
  "PHOTO",
];

const noDocument = ["No Document"];

const programType = [
  {
    pName: "Online",
    pValue: "ONLINE",
  },
  {
    pName: "Offline",
    pValue: "OFFLINE",
  },
  {
    pName: "Hybrid",
    pValue: "HYBRID",
  },
];

function CreateProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [document, setDocument] = useState(true);
  const [kendras, setKendras] = useState([]);
  const [program, setProgram] = useState({
    name: "",
    description: "",
    program_fee: "",
    program_fee_in_usd: "",
    course: "",
    program_type: "",
    status: "NOT_STARTED",
    min_age: "",
    max_age: "",
    registration_start_date: "",
    registration_end_date: "",
    publish_date: null,
    program_start_date: "",
    program_end_date: "",
    program_max_size: "",
    required_documents: [],
    kendra: "",
  });
  const [errObj, setErrObj] = useState({
    name: "",
    description: "",
    program_fee: "",
    program_fee_in_usd: "",
    course: "",
    program_type: "",
    status: "",
    min_age: "",
    max_age: "",
    registration_start_date: "",
    registration_end_date: "",
    publish_date: null,
    program_start_date: "",
    program_end_date: "",
    program_max_size: "",
    required_documents: [],
    kendra: "",
  });

  useEffect(() => {
    if (user.userData.roles[0] !== "ADMIN") {
      window.location.href = "/home";
      return;
    }
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    getCourseData();
    getKendraData();

    if (props.match.params.id) {
      getProgramDataBasedOnId(props.match.params.id);
    }
  }, []);

  const getFormatedDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const getProgramDataBasedOnId = (id) => {
    axios
      .get("/programs/" + id)
      .then((res) => {
        setProgram((program) => ({
          ...program,
          name: res.data.result.name,
          description: res.data.result.description,
          program_fee: res.data.result.program_fee,
          program_fee_in_usd: res.data.result.program_fee_in_usd,
          course: res.data.result.course,
          program_type: res.data.result.program_type,
          status: res.data.result.status,
          min_age: res.data.result.min_age,
          max_age: res.data.result.max_age,
          registration_start_date: getFormatedDate(
            res.data.result.registration_start_date
          ),
          registration_end_date: getFormatedDate(
            res.data.result.registration_end_date
          ),
          //   publish_date: getFormatedDate(res.data.result.publish_date),
          program_start_date: getFormatedDate(
            res.data.result.program_start_date
          ),
          program_end_date: getFormatedDate(res.data.result.program_end_date),
          program_max_size: res.data.result.program_max_size,
          required_documents: res.data.required_documents,
          kendra: res.data.result.kendra,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCourseData = () => {
    axios
      .get("/courses/")
      .then((res) => {
        setCourseData(res.data.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKendraData = () => {
    axios
      .get("/kendras/")
      .then((res) => {
        console.log(res.data.result, "res data");
        setKendras(res.data.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onProgramChange = (e) => {
    const { id, value } = e.target;
    setProgram((program) => ({ ...program, [id]: value }));
  };

  const validateProgramData = () => {
    let valid = true;

    if (program.kendra === "S_O") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        kendra: "Please select a Kendra",
      }));
    }

    if (program.name.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        name: "Program name should be minimum 3 letters",
      }));
    }

    if (program.description.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        description: "Program description should be minimum 3 letters",
      }));
    }

    if (program.program_fee.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_fee: "Program fee should be mandatory",
      }));
    }
    if (program.program_fee_in_usd.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_fee_in_usd: "Program fee in USD should be mandatory",
      }));
    }
    if (program.course.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        course: "Course should be Selected",
      }));
    }

    if (program.program_type.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_type: "Program type should be Selected",
      }));
    }

    if (program.min_age.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({ ...errObj, min_age: "Minimum age mandatory" }));
    } else if (program.max_age.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({ ...errObj, max_age: "Maximum age mandatory" }));
    } else if (program.max_age < program.min_age) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        max_age: "Maximum age cant be lesser than Minimum age",
      }));
    }

    if (program.program_start_date.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_start_date: "Program start date should be mandatory",
      }));
    }

    if (program.program_end_date.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_end_date: "Program end date should be mandatory",
      }));
    }

    if (program.registration_start_date.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        registration_start_date: "Registration start date should be mandatory",
      }));
    }

    if (program.registration_end_date.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        registration_end_date: "Registration end date should be mandatory",
      }));
    }

    // if (program.publish_date.length <= 0) {
    //     valid = false
    //     setErrObj(errObj => ({ ...errObj, publish_date: 'Publish date should be mandatory' }));
    // }

    if (program.program_max_size.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        program_max_size: "Program Maximum size should be mandatory",
      }));
    }

    if (valid) {
      submitProgram();
      setErrObj((errObj) => ({
        ...errObj,
        name: "",
        description: "",
        program_fee: "",
        program_fee_in_usd: "",
        course: "",
        program_type: "",
        status: "",
        min_age: "",
        max_age: "",
        registration_start_date: "",
        registration_end_date: "",
        publish_date: null,
        program_start_date: "",
        program_end_date: "",
        program_max_size: "",
        required_documents: [],
        kendra: "",
      }));
    }
  };

  const submitProgram = () => {
    if (props.match.params.id) {
      program.status = "NOT_STARTED";
      axios
        .patch("/programs/" + props.match.params.id, program)
        .then((res) => {
          if (res.data.status_code === "200") {
            alert(res.data.status_message);
            visitProgramDashboard();
          } else {
            alert(res.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/programs/", program)
        .then((res) => {
          if (res.data.status_code === "200") {
            alert(res.data.status_message);
            visitProgramDashboard();
          } else {
            alert(res.data.error);
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
          console.log(err.response.data.error);
        });
    }
  };

  const visitProgramDashboard = () => {
    window.location.href = "../programdashboard";
  };

  const onCheckChange = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    setProgram((program) => ({
      ...program,
      required_documents: checkedValues,
    }));
  };

  const noDocumentHandler = () => {
    if (document) {
      setDocument(false);
    } else {
      setDocument(true);
    }
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
                Create Event
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <div style={{ float: "right" }} className="row">
              <Button
                style={{ backgroundColor: "#ffdb58", fontWeight: "bold" }}
                shape="round"
                size="large"
                onClick={(e) => visitProgramDashboard()}
              >
                Event Dashboard
              </Button>
            </div>
            <div className="text-box mt-5 mb-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={program.name}
                  id="name"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="name">
                  Event Name
                </label>
                <p style={errStyle}>{errObj.name}</p>
              </div>
              <div className="form-group">
                <input
                  type="textarea"
                  className="form-control-input notEmpty"
                  value={program.description}
                  id="description"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="description">
                  Event Description
                </label>
                <p style={errStyle}>{errObj.description}</p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  value={program.program_fee}
                  id="program_fee"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_fee">
                  Program Fee (In Rupees)
                </label>
                <p style={errStyle}>{errObj.program_fee}</p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  value={program.program_fee_in_usd}
                  id="program_fee_in_usd"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_fee_in_usd">
                  Program Fee (USD)
                </label>
                <p style={errStyle}>{errObj.program_fee}</p>
              </div>
              <div className="form-group">
                {/* <input type="" className="form-control-input notEmpty" value={program.course} id="course" onChange={(e) => onProgramChange(e)} required /> */}
                <select
                  className="form-control-input notEmpty"
                  value={program.course}
                  id="course"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="">Select</option>
                  {courseData.map((d, index) => {
                    if (d.isActive) {
                      return (
                        <option value={d._id} key={index}>
                          {d.course_name}
                        </option>
                      );
                    }
                  })}
                </select>
                <label className="label-control" htmlFor="course">
                  Course
                </label>
                <p style={errStyle}>{errObj.course}</p>
              </div>
              <div className="form-group">
                {/* <input type="number" className="form-control-input notEmpty" value={program.program_type} id="program_type" onChange={(e) => onProgramChange(e)} required /> */}
                <select
                  className="form-control-input notEmpty"
                  id="program_type"
                  calue={program.program_type}
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="">Select</option>
                  {programType.map((d, index) => {
                    return (
                      <option value={d.pValue} key={index}>
                        {d.pName}
                      </option>
                    );
                  })}
                </select>
                <label className="label-control" htmlFor="program_type">
                  Event Type
                </label>
                <p style={errStyle}>{errObj.program_type}</p>
              </div>
              {/* <div className="form-group"> <select className="form-control-input notEmpty" id="status" value={program.status} onChange={(e) => onProgramChange(e)} required>
                                    {programStatus.map((d, index) => {
                                        return <option value={d.pValue} key={index}>{d.pName}</option>
                                    })}
                                </select>
                                <label className="label-control" htmlFor="status">Program Status</label>
                                <p style={errStyle}>{errObj.status}</p>
                            </div> */}
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="kendra"
                  onChange={(e) => onProgramChange(e)}
                  //value={program.kendra}
                  required
                >
                  <option value="S_O" key="k" selected>
                    Select Option
                  </option>
                  {kendras.map((kendras, index) => {
                    return (
                      <option value={kendras.name} key={index}>
                        {kendras.name} - {kendras.address}
                      </option>
                    );
                  })}
                </select>

                <label className="label-control" htmlFor="kendra">
                  Event Location (Kendra)
                  <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.kendra}</p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  value={program.min_age}
                  id="min_age"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="min_age">
                  Minimum Age
                </label>
                <p style={errStyle}>{errObj.min_age}</p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  value={program.max_age}
                  id="max_age"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="max_age">
                  Maximum Age
                </label>
                <p style={errStyle}>{errObj.max_age}</p>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  value={program.program_start_date}
                  id="program_start_date"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_start_date">
                  Program Start Date
                </label>
                <p style={errStyle}>{errObj.program_start_date}</p>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  value={program.program_end_date}
                  id="program_end_date"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_end_date">
                  Program End Date
                </label>
                <p style={errStyle}>{errObj.program_end_date}</p>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  value={program.registration_start_date}
                  id="registration_start_date"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label
                  className="label-control"
                  htmlFor="registration_start_date"
                >
                  Registration Start Date
                </label>
                <p style={errStyle}>{errObj.registration_start_date}</p>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  value={program.registration_end_date}
                  id="registration_end_date"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label
                  className="label-control"
                  htmlFor="registration_end_date"
                >
                  Registration End Date
                </label>
                <p style={errStyle}>{errObj.registration_end_date}</p>
              </div>
              {/* <div className="form-group">
                                <input type="date" className="form-control-input notEmpty" value={program.publish_date} id="publish_date" onChange={(e) => onProgramChange(e)} required />
                                <label className="label-control" htmlFor="publish_date">Publish Date</label>
                                <p style={errStyle}>{errObj.publish_date}</p>
                            </div> */}
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  value={program.program_max_size}
                  id="program_max_size"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="program_max_size">
                  Event maximum Size
                </label>
                <p style={errStyle}>{errObj.program_max_size}</p>
              </div>
              <div className="form-group">
                <Checkbox.Group
                  options={noDocument}
                  onChange={noDocumentHandler}
                />
                {/* <label className="label-control" htmlFor="documents">
                  Documents needed
                </label> */}
              </div>
              <hr />
              {document && (
                <div className="form-group">
                  <Checkbox.Group
                    options={docsOptions}
                    onChange={onCheckChange}
                  />
                </div>
              )}
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control-submit-button"
                  defaultChecked={program.required_documents}
                  onClick={(e) => validateProgramData(e)}
                >
                  {props.match.params.id ? (
                    <>Update Event</>
                  ) : (
                    <>Create Event</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProgram;
