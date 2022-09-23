import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import fileUploadUrl from "../../constants/constants";

import { Checkbox } from "antd";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

const noteStyle = {
  color: "#e5b212",
  textAlign: "center",
  fontSize: ".9rem",
};

const healthOptions = [
  {
    value: "Physical limitations or disabilities",
    label: "Physical limitations or disabilities",
  },
  { value: "Communicable disease", label: "Communicable disease" },
  { value: "Diabetes/ Hypoglycemia", label: "Diabetes/ Hypoglycemia" },
  {
    value: "Urinary infection/condition",
    label: "Urinary infection/condition",
  },
  { value: "Heart conditions/ Stroke", label: "Heart conditions/ Stroke" },
  { value: "High/low blood pressure", label: "High/low blood pressure" },
  { value: "Hernia", label: "Hernia" },
  {
    value: "Asthma/ other Respiratory conditions",
    label: "Asthma/ other Respiratory conditions",
  },
  { value: "Psychiatric condition", label: "Psychiatric condition" },
  { value: "Heartburn", label: "Heartburn" },
  { value: "Arthritis", label: "Arthritis" },
  { value: "Ligament Injuries", label: "Ligament Injuries" },
  { value: "Osteoporosis", label: "Osteoporosis" },
  { value: "Seizure/ Epilepsy", label: "Seizure/ Epilepsy" },
  { value: "Frozen Shoulder", label: "Frozen Shoulder" },
  {
    value: "Insomnia / Sleep Disorder/ Snoring",
    label: "Insomnia / Sleep Disorder/ Snoring",
  },
  { value: "Anemia", label: "Anemia" },
  {
    value: "Spinal conditions/ Slip Disc/ Chronic back pain",
    label: "Spinal conditions/ Slip Disc/ Chronic back pain",
  },
  { value: "Endocrine conditions", label: "Endocrine conditions" },
  { value: "Chronic sinus conditions", label: "Chronic sinus conditions" },
  { value: "Chronic joint pain", label: "Chronic joint pain" },
  {
    value: "Recovering from an addiction",
    label: "Recovering from an addiction",
  },
  {
    value: "Hospitalization for a condition",
    label: "Hospitalization for a condition",
  },
  { value: "Peptic ulcer", label: "Peptic ulcer" },
  {
    value:
      "Serious illness/ Major accident or injury / Surgery in last 5 years",
    label:
      "Serious illness/ Major accident or injury / Surgery in last 5 years",
  },
  {
    value: "Any Psychological disorders",
    label: "Any Psychological disorders",
  },
  {
    value: "Vitamin Deficiency (esp. Vitamin B12 & D)",
    label: "Vitamin Deficiency (esp. Vitamin B12 & D)",
  },
  { value: "Pregnancy", label: "Pregnancy" },
  { value: "None of the Above", label: "None of the Above" },
];

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
    age: "",
    gender: "",
    dob: "",
    maritalstatus: "",
    qualification: "",
    occupation: "",
    occupation_details: "",
    health_ailments: "",
    lifestyle: "",
    previous_experience: "No",
    experty_level: "",
    about_byuk: "",
    alternate_phone_number: "",
    emergency_contactname: "",
    emergency_contactnumber: "",
    emergency_contactrelationship: "",
    emergency_contactname2: "",
    emergency_contactnumber2: "",
    emergency_contactrelationship2: "",
    languages: "",
    learning_yoga: "No Experience",
    kind_of_yoga: "",
    health_conditions: "",
    medicines_details: "",
    covid_vaccine_dose: "No",
    tobbaco_consumption: "No",
    frequency_details_of_tobaaco_use: "",
    role_of_yoga_teacher: "",
    planning_to_teach: "",
    why_teach_yoga: "",
    teaching_experience: "No",
    teaching_experience_description: "",
    attraction_to_yoga_path: "",
    meditation_practices: "",
    terms_agreed: "No",
    rules_agreed: "No",
    fees_agreed: "No",
  });
  const [errObj, setErrObj] = useState({
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    status: "REGISTERED",
    gender: "",
    age: "",
    dob: "",
    maritalstatus: "",
    qualification: "",
    occupation: "",
    occupation_details: "",
    health_ailments: "",
    lifestyle: "",
    previous_experience: "No",
    experty_level: "",
    about_byuk: "",
    alternate_phone_number: "",
    emergency_contactname: "",
    emergency_contactnumber: "",
    emergency_contactrelationship: "",
    emergency_contactname2: "",
    emergency_contactnumber2: "",
    emergency_contactrelationship2: "",
    languages: "",
    kind_of_yoga: "",
    health_conditions: "",
    medicines_details: "",
    covid_vaccine_dose: "No",
    tobbaco_consumption: "No",
    frequency_details_of_tobaaco_use: "",
    role_of_yoga_teacher: "",
    planning_to_teach: "",
    why_teach_yoga: "",
    teaching_experience: "No",
    teaching_experience_description: "",
    attraction_to_yoga_path: "",
    meditation_practices: "",
    terms_agreed: "No",
    rules_agreed: "No",
    fees_agreed: "No",
  });
  const [docs, setDocs] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [relationship, setRelationship] = useState("Self");
  const [prevExperience, setPrevExperience] = useState(false);
  const [otherSource, setOtherSource] = useState(false);
  const [residentialCourse, setResidentialCourse] = useState(false);
  const [checkedHealth, setCheckedHealth] = useState([]);
  const [termsClicked, setTermsClicked] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [rulesClicked, setRulesClicked] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);
  const [feesClicked, setFeesClicked] = useState(false);
  const [feesAgreed, setFeesAgreed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.userData.phone_num);
 let feesCourseNameUrl="/refund?fees="+programData.program_fee+"&course_name="+programData.name;
 let paymentsfeesCourseNameUrl="/payments?fees="+programData.program_fee+"&course_name="+programData.name;
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
    console.log(user.userData.email_id);
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
        if (res.data.result.program_type == "OFFLINE") {
          setResidentialCourse(true);
        }
        axios.get("/courses/" + res.data.result.course).then((res) => {
          setCourseData(res.data.result);
        });
        setDocs(res.data.result.required_documents);
      }
    });
  };

  const onProgramChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value, "test");

    if (id === "previous_experience" && value === "Yes") {
      setPrevExperience(true);
    } else {
      setPrevExperience(false);
    }
    if (id === "about_byuk" && value == "other") {
      setOtherSource(true);
    } else {
      setOtherSource(false);
    }
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

    if (program.gender == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        gender: "Please Select The Gender",
      }));
    }

    if (program.age == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        age: "Please Enter Age",
      }));
    }

    if (program.dob == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        dob: "Please Select The Date of Birth",
      }));
    }

    if (program.maritalstatus == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        maritalstatus: "Please Select The Marital Status",
      }));
    }

    if (program.qualification == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        qualification: "Please Select The Qualification",
      }));
    }

    if (program.occupation == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        occupation: "Please Select The Occupation",
      }));
    }

    if (program.lifestyle == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        lifestyle: "Please Select The Lifestyle",
      }));
    }

    if (prevExperience && program.experty_level == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        experty_level: "Please Select Experty Level",
      }));
    }

    if (program.about_byuk == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        about_byuk: "Please Select The Option",
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
    console.log("Validation till here" + valid);
    if (residentialCourse && program.emergency_contactname.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        emergency_contactname: "Please enter the contact person's name",
      }));
    }

    if (residentialCourse && program.emergency_contactnumber.length == 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        emergency_contactnumber: "Please enter the contact person's number",
      }));
    }
    console.log(
      "Validation till here 2" +
        valid +
        " program type " +
        residentialCourse +
        " course name " +
        courseData.course_name
    );
    if (residentialCourse && program.emergency_contactnumber.length < 10) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        emergency_contactnumber: "Please enter a valid contact number",
      }));
    }

    if (
      residentialCourse &&
      program.emergency_contactrelationship.length == 0
    ) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        emergency_contactrelationship: "Please enter the relationship",
      }));
    }

    if (residentialCourse && program.health_conditions.length == 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        health_conditions: "Please enter your health conditions",
      }));
    }
    console.log(
      "Validation till here 3" +
        valid +
        " program type " +
        programData.program_type
    );
    if (residentialCourse && program.medicines_details == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        medicines_details: "Please enter your medicines details",
      }));
    }

    if (residentialCourse && program.covid_vaccine_dose == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        covid_vaccine_dose: "Please select the option",
      }));
    }
    console.log("Validation till here 4" + valid);
    if (
      courseData.course_name === "T T C" &&
      program.role_of_yoga_teacher == ""
    ) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        role_of_yoga_teacher: "Please Do not leave this feild blank",
      }));
    }
    console.log("Validation till here 5" + valid);
    if (courseData.course_name === "T T C" && program.planning_to_teach == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        planning_to_teach: "Please select an option",
      }));
    }

    if (courseData.course_name === "T T C" && program.why_teach_yoga == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        why_teach_yoga: "Please enter why you wanna teach yoga",
      }));
    }
    console.log("Validation till here 6" + valid);
    if (
      courseData.course_name === "T T C" &&
      program.teaching_experience_description == ""
    ) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        teaching_experience_description: "Please Do not leave this feild blank",
      }));
    }

    if (
      courseData.course_name === "T T C" &&
      program.attraction_to_yoga_path == ""
    ) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        attraction_to_yoga_path: "Please Do not leave this feild blank",
      }));
    }
    console.log("Validation till here 7" + valid);
    if (
      courseData.course_name === "T T C" &&
      program.meditation_practices == ""
    ) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        meditation_practices: "Please Do not leave this feild blank",
      }));
    }

    if (courseData.course_name === "T T C" && !rulesAgreed) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        rules_agreed: "Please read the rules and regulations and Select Agree",
      }));
      alert(
        "Please read Ashram rules and regulations and provide your concern"
      );
    }
    console.log("Validation till here 8" + valid);
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
        gender: "",
        age: "",
        dob: "",
        maritalstatus: "",
        qualification: "",
        occupation: "",
        occupation_details: "",
        health_ailments: "",
        lifestyle: "",
        previous_experience: "No",
        experty_level: "",
        about_byuk: "",
        alternate_phone_number: "",
        emergency_contactname: "",
        emergency_contactnumber: "",
        emergency_contactrelationship: "",
        emergency_contactname2: "",
        emergency_contactnumber2: "",
        emergency_contactrelationship2: "",
        languages: "",
        kind_of_yoga: "",
        health_conditions: "",
        medicines_details: "",
        covid_vaccine_dose: "No",
        tobbaco_consumption: "No",
        frequency_details_of_tobaaco_use: "",
        planning_to_teach: "",
        why_teach_yoga: "",
        teaching_experience: "No",
        teaching_experience_description: "",
        attraction_to_yoga_path: "",
        meditation_practices: "",
        terms_agreed: "No",
        rules_agreed: "No",
        fees_agreed: "No",
      }));
      setProgram((errObj) => ({
        ...errObj,
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        status: "REGISTERED",
        age: "",
        gender: "",
        dob: "",
        maritalstatus: "",
        qualification: "",
        occupation: "",
        occupation_details: "",
        health_ailments: "",
        lifestyle: "",
        previous_experience: "No",
        experty_level: "",
        about_byuk: "",
        alternate_phone_number: "",
        emergency_contactname: "",
        emergency_contactnumber: "",
        emergency_contactrelationship: "",
        emergency_contactname2: "",
        emergency_contactnumber2: "",
        emergency_contactrelationship2: "",
        languages: "",
        kind_of_yoga: "",
        health_conditions: "",
        medicines_details: "",
        covid_vaccine_dose: "No",
        tobbaco_consumption: "No",
        frequency_details_of_tobaaco_use: "",
        role_of_yoga_teacher: "",
        planning_to_teach: "",
        why_teach_yoga: "",
        teaching_experience: "No",
        teaching_experience_description: "",
        attraction_to_yoga_path: "",
        meditation_practices: "",
        terms_agreed: "No",
        rules_agreed: "No",
        fees_agreed: "No",
      }));
    }
  };

  const submitProgram = () => {
    console.log(program);
    var obj = {};
    if (isChecked) {
      obj = {
        program_id: props.match.params.id,
        user_id: user.user.id,
        user_name: checkedName,
        user_email: user.userData.email_id,
        phoneNum: phoneNumber,
        address_1: program.address_1,
        address_2: program.address_2,
        city: program.city,
        state: program.state,
        country: program.country,
        status: "REGISTERED",
        reject_reason: "",
        registered_by: user.user.name,
        relationship: relationship,
        age: program.age,
        maritalstatus: program.maritalstatus,
        date_of_birth: program.dob,
        gender: program.gender,
        qualification: program.qualification,
        occupation: program.occupation,
        occupation_details: program.occupation_details,
        health_ailments: checkedHealth,
        lifestyle: program.lifestyle,
        previous_experience: program.previous_experience,
        experty_level: program.experty_level,
        about_byuk: program.about_byuk,
        alternate_phone_number: program.alternate_phone_number,
        emergency_contactname: program.emergency_contactname,
        emergency_contactnumber: program.emergency_contactnumber,
        emergency_contactrelationship: program.emergency_contactrelationship,
        emergency_contactname2: program.emergency_contactname2,
        emergency_contactnumber2: program.emergency_contactnumber2,
        emergency_contactrelationship2: program.emergency_contactrelationship2,
        languages: program.languages,
        learning_yoga: program.learning_yoga,
        kind_of_yoga: program.kind_of_yoga,
        health_conditions: program.health_conditions,
        medicines_details: program.medicines_details,
        covid_vaccine_dose: program.covid_vaccine_dose,
        tobbaco_consumption: program.tobbaco_consumption,
        frequency_details_of_tobaaco_use:
          program.frequency_details_of_tobaaco_use,
        role_of_yoga_teacher: program.role_of_yoga_teacher,
        planning_to_teach: program.planning_to_teach,
        why_teach_yoga: program.why_teach_yoga,
        teaching_experience: program.teaching_experience,
        teaching_experience_description:
          program.teaching_experience_description,
        attraction_to_yoga_path: program.attraction_to_yoga_path,
        meditation_practices: program.meditation_practices,
        terms_agreed: termsAgreed ? "Yes" : "No",
        rules_agreed: rulesAgreed ? "Yes" : "No",
        fees_agreed: feesAgreed ? "Yes" : "No",
      };
    } else {
      obj = {
        program_id: props.match.params.id,
        user_id: user.user.id,
        user_name: user.user.username,
        user_email: user.userData.email_id,
        phoneNum: phoneNumber,
        address_1: program.address_1,
        address_2: program.address_2,
        city: program.city,
        state: program.state,
        country: program.country,
        maritalstatus: program.maritalstatus,
        status: "REGISTERED",
        reject_reason: "",
        registered_by: user.user.name,
        relationship: relationship,
        age: program.age,
        date_of_birth: program.dob,
        gender: program.gender,
        qualification: program.qualification,
        occupation: program.occupation,
        health_ailments: checkedHealth,
        lifestyle: program.lifestyle,
        previous_experience: program.previous_experience,
        experty_level: program.experty_level,
        about_byuk: program.about_byuk,
        alternate_phone_number: program.alternate_phone_number,
        emergency_contactname: program.emergency_contactname,
        emergency_contactnumber: program.emergency_contactnumber,
        emergency_contactrelationship: program.emergency_contactrelationship,
        emergency_contactname2: program.emergency_contactname2,
        emergency_contactnumber2: program.emergency_contactnumber2,
        emergency_contactrelationship2: program.emergency_contactrelationship2,
        languages: program.languages,
        learning_yoga: program.learning_yoga,
        kind_of_yoga: program.kind_of_yoga,
        health_conditions: program.health_conditions,
        medicines_details: program.medicines_details,
        covid_vaccine_dose: program.covid_vaccine_dose,
        tobbaco_consumption: program.tobbaco_consumption,
        frequency_details_of_tobaaco_use:
          program.frequency_details_of_tobaaco_use,
        role_of_yoga_teacher: program.role_of_yoga_teacher,
        planning_to_teach: program.planning_to_teach,
        why_teach_yoga: program.why_teach_yoga,
        teaching_experience: program.teaching_experience,
        teaching_experience_description:
          program.teaching_experience_description,
        attraction_to_yoga_path: program.attraction_to_yoga_path,
        meditation_practices: program.meditation_practices,
        terms_agreed: termsAgreed ? "Yes" : "No",
        rules_agreed: rulesAgreed ? "Yes" : "No",
        fees_agreed: feesAgreed ? "Yes" : "No",
      };
    }

    axios
      .post("/usermanagement/", obj)
      .then((res) => {
        console.log(res);
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          if(residentialCourse)
          {
          setTimeout(function () {
            window.location.href = "/home";
          }, 300);
          }
          else
          {
	        setTimeout(function () {
            window.location.href = paymentsfeesCourseNameUrl;
          }, 300);
			}
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

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
      document.getElementById("userName").value = "";
    } else {
      setIsChecked(false);
    }
  };

  const checkNameHandler = (e) => {
    setCheckedName(e.target.value);
  };

  const relationshipChangeHandler = (e) => {
    setRelationship(e.target.value);
  };

  const handleMultiSelect = (data) => {
    console.log(data, "checked data");
    setCheckedHealth(data);
  };

  const rulesHandler = () => {
    setRulesClicked(true);
  };
  const feesHandler = () => {
    setFeesClicked(true);
  };

  const termsHandler = () => {
    setTermsClicked(true);
  };

  const termsAgreementHandler = (event) => {
    if (event.target.checked) {
      setTermsAgreed(true);
    } else {
      setTermsAgreed(false);
    }
  };

  const feesAgreementHandler = (event) => {
    if (event.target.checked) {
      setFeesAgreed(true);
    } else {
      setFeesAgreed(false);
    }
  };

  const rulesAgreementHandler = (event) => {
    if (event.target.checked) {
      setRulesAgreed(true);
    } else {
      setRulesAgreed(false);
    }
  };

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
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
                Register Event
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <div className="text-box mt-5 mb-5">
              <div className="form-check ml-3 mb-3">
                <h1
                  style={{
                    fontFamily: "Poppins",
                    color: "darkblue",
                    fontSize: "20px",
                  }}
                >
                  Personal Details
                </h1>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="checked"
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label">
                  Register Event for other person
                </label>
              </div>
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
                  value={courseData.course_name}
                  id="courseName"
                  required
                  disabled
                />
                <label className="label-control" htmlFor="name">
                  Course Name
                </label>
              </div>
              <div className="form-group">
                {isChecked ? (
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    id="userName"
                    onChange={checkNameHandler}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    value={user.userData.first_name}
                    id="userName"
                    required
                    disabled
                  />
                )}
                <label className="label-control" htmlFor="name">
                  Name
                </label>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="gender"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="" key="" selected>
                    Select Option
                  </option>
                  <option value="Male" key="male">
                    Male
                  </option>
                  <option value="Female" key="female">
                    Female
                  </option>
                  <option value="Rather Not Say" key="rather not say">
                    Rather Not Say
                  </option>
                </select>
                <label className="label-control">Gender</label>
                <p style={errStyle}>{errObj.gender}</p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control-input notEmpty"
                  id="age"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control">Age</label>
                <p style={errStyle}>{errObj.age}</p>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  id="dob"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control">Date of Birth</label>
                <p style={errStyle}>{errObj.dob}</p>
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
                  type="number"
                  className="form-control-input notEmpty"
                  value={phoneNumber}
                  id="phoneNum"
                  onChange={phoneNumberHandler}
                  required
                />
                <label className="label-control">Phone Number</label>
              </div>
              {isChecked ? (
                <div className="form-group">
                  <select
                    className="form-control-input notEmpty"
                    id="relationship"
                    required
                    onChange={relationshipChangeHandler}
                  >
                    <option value="Parent" key="parent">
                      Parent
                    </option>
                    <option value="Spouse" key="spouse">
                      Spouse
                    </option>
                    <option value="Self" key="self" selected>
                      Self
                    </option>
                     <option value="Child1" key="child1" >
                      Child 1
                    </option>
                     <option value="Child2" key="child2" >
                      Child 2
                    </option>
                    <option value="Relative" key="relative" >
                      Relative
                    </option>
                  </select>
                  <label className="label-control">Relationship</label>
                </div>
              ) : (
                <div className="form-group">
                  <select
                    className="form-control-input notEmpty"
                    id="relationship"
                    disabled
                    required
                  >
                    <option value="Parent" key="parent">
                      Parent
                    </option>
                    <option value="Spouse" key="spouse">
                      Spouse
                    </option>
                    <option value="Self" key="self" selected>
                      Self
                    </option>
                  </select>
                  <label className="label-control">Relationship</label>
                </div>
              )}
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
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  onChange={(e) => onProgramChange(e)}
                  id="maritalstatus"
                  required
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  <option value="Single" key="single">
                    Single
                  </option>
                  <option value="Married" key="married">
                    Married
                  </option>
                  <option value="Widower/Divorsed" key="widower/divorsed">
                    Widower/Divorsed
                  </option>
                  <option value="Rather Not Say" key="rather not say">
                    Rather Not Say
                  </option>
                </select>
                <label className="label-control">Marital Status</label>
                <p style={errStyle}>{errObj.maritalstatus}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="qualification"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  <option value="School" key="school">
                    School
                  </option>
                  <option value="Undergraduate" key="undergraduate">
                    Undergraduate
                  </option>
                  <option value="Graduate" key="Graduate">
                    Graduate
                  </option>
                  <option value="Diploma" key="diploma">
                    Diploma
                  </option>
                  <option value="Post Graduate" key="post graduate">
                    Post Graduate
                  </option>
                  <option value="PhD" key="PhD">
                    PhD
                  </option>
                  <option value="Rather Not Say" key="rather not say">
                    Rather Not Say
                  </option>
                </select>
                <label className="label-control">Qualification</label>
                <p style={errStyle}>{errObj.qualification}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="occupation"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  <option value="Student" key="student">
                    Student
                  </option>
                  <option value="Unemployed" key="unemployed">
                    Unemployed
                  </option>
                  <option value="Self Employed" key="self employed">
                    Self Employed
                  </option>
                  <option value="Homemaker" key="Homemaker">
                    Homemaker
                  </option>
                  <option value="Govt/Public Sector" key="govt/public sector">
                    Govt/Public Sector
                  </option>
                  <option value="Private Sector" key="private sector">
                    Private Sector
                  </option>
                  <option value="other" key="other">
                    Other (Please Specify)
                  </option>
                </select>
                <label className="label-control">Occupation</label>
                <p style={errStyle}>{errObj.occupation}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  id="occupation_details"
                  onChange={(e) => onProgramChange(e)}
                />
                <label className="label-control">Occupation Details</label>
                <p style={errStyle}>{errObj.occupation_details}</p>
              </div>
              <h1
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "20px",
                }}
              >
                Health & Lifestyle
              </h1>
              
              <div className="form-group">
                <Checkbox.Group
                  options={healthOptions}
                  onChange={handleMultiSelect}
                />
              </div>
              
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="lifestyle"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  <option value="Sedentary" key="sedentary">
                    Sedentary
                  </option>
                  <option value="Moderately active" key="moderately active">
                    Moderately Active
                  </option>
                  <option value="Highly active" key="highly active">
                    Highly Active
                  </option>
                </select>
                <label className="label-control">Lifestyle</label>
                <p style={errStyle}>{errObj.lifestyle}</p>
              </div>
              {residentialCourse && (
                <>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="health_conditions"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Write about your health conditions in detail
                    </label>
                    <p style={errStyle}>{errObj.health_conditions}</p>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="medicines_details"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      List down any allopathic or ayurvedic medicines you take
                    </label>
                    <p style={errStyle}>{errObj.medicines_details}</p>
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control-input notEmpty"
                      id="covid_vaccine_dose"
                      onChange={(e) => onProgramChange(e)}
                      required
                    >
                      <option value="" selected>
                        Select Option
                      </option>
                      <option value="Yes Single Dose" key="single dose">
                        Yes - Single Dose
                      </option>
                      <option value="Yes Both Dose" key="both dose">
                        Yes - Both Dose
                      </option>
                      <option value="No" key="no">
                        No
                      </option>
                    </select>
                    <label className="label-control">
                      Have you been vaccinated for COVID
                    </label>
                    <p style={errStyle}>{errObj.covid_vaccine_dose}</p>
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control-input notEmpty"
                      id="tobbaco_consumption"
                      onChange={(e) => onProgramChange(e)}
                      required
                    >
                      <option value="Yes" key="yes">
                        Yes
                      </option>
                      <option value="No" key="no" selected>
                        No
                      </option>
                    </select>
                    <label className="label-control mb-4">
                      Have you used tobacco,alcohol, recreational drugs or
                      illicit substances in last 12 months?
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="frequency_details_of_tobaaco_use"
                      rows="3"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Do you currently continue to use any of these substances?
                      If yes, please list substance and frequency of use:
                    </label>
                  </div>
                </>
              )}
              <h1
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "20px",
                }}
              >
                Yoga Experience
              </h1>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="previous_experience"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="Yes" key="yes">
                    Yes
                  </option>
                  <option value="No" key="no" selected>
                    No
                  </option>
                </select>
                <label className="label-control">
                  Any Previous Yoga Experience
                </label>
              </div>
              {prevExperience && (
                <div className="form-group">
                  <select
                    className="form-control-input notEmpty"
                    id="experty_level"
                    onChange={(e) => onProgramChange(e)}
                    required
                  >
                    <option value="" selected></option>
                    <option value="Begginer" key="begginer">
                      Begginer
                    </option>
                    <option value="Intermediate" key="intermediate">
                      Intermediate
                    </option>
                    <option value="Advanced" key="advanced">
                      Advanced
                    </option>
                  </select>
                  <label className="label-control">Expertise</label>
                  <p style={errStyle}>{errObj.experty_level}</p>
                </div>
              )}
              
              {prevExperience && residentialCourse && (
                <>
                  <div className="form-group">
                    <select
                      className="form-control-input notEmpty"
                      id="learning_yoga"
                      onChange={(e) => onProgramChange(e)}
                      required
                    >
                      <option value="No Experience" key="no" selected>
                        No Experience
                      </option>
                      <option value="Yes 6 Months" key="yes">
                        Yes - 6 Months
                      </option>
                      <option value="Yes More Than 1 Year" key="yes 1 year">
                        Yes - More than 1 Year
                      </option>
                    </select>
                    <label className="label-control">
                      How Long Have You Been Learning/Practicing Yoga
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="kind_of_yoga"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Style of Yoga You Practice, Give Details
                    </label>
                  </div>
                </>
              )}
              {courseData.course_name === "T T C" && (
                <>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="role_of_yoga_teacher"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      What does Yoga mean to you? What should the role of a Yoga
                      teacher be?
                    </label>
                    <p style={errStyle}>{errObj.role_of_yoga_teacher}</p>
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control-input notEmpty"
                      id="planning_to_teach"
                      onChange={(e) => onProgramChange(e)}
                    >
                      <option value="" selected>
                        Select Option
                      </option>
                      <option value="No" key="no">
                        No
                      </option>
                      <option value="Yes" key="yes">
                        Yes
                      </option>
                      <option value="Maybe after a few months" key="maybe">
                        Maybe after a few months
                      </option>
                    </select>
                    <label className="label-control">
                      Are you planning to teach Yoga after completing this
                      course?
                    </label>
                    <p style={errStyle}>{errObj.planning_to_teach}</p>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="why_teach_yoga"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Explain why you want to teach Yoga?
                    </label>
                    <p style={errStyle}>{errObj.why_teach_yoga}</p>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control-input notEmpty"
                      id="teaching_experience"
                      onChange={(e) => onProgramChange(e)}
                    >
                      <option value="No" key="no" selected>
                        No
                      </option>
                      <option value="Yes" key="yes">
                        Yes
                      </option>
                    </select>
                    <label className="label-control">
                      Are you planning to teach Yoga after completing this
                      course?
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="teaching_experience_description"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      If yes, Please explain your prior teaching experience in
                      brief
                    </label>
                    <p style={errStyle}>
                      {errObj.teaching_experience_description}
                    </p>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="attraction_to_yoga_path"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      What attracts you to spirituality and specifically to the
                      path of Yoga?
                    </label>
                    <p style={errStyle}>{errObj.attraction_to_yoga_path}</p>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control-input notEmpty"
                      id="meditation_practices"
                      rows="2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Please describe any other spiritual or meditation
                      practices which you follow?
                    </label>
                    <p style={errStyle}>{errObj.meditation_practices}</p>
                  </div>
                </>
              )}
              {residentialCourse && (
                <div>
                  <h1
                    style={{
                      fontFamily: "Poppins",
                      color: "darkblue",
                      fontSize: "20px",
                    }}
                  >
                    Required Details for Residential Course
                  </h1>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control-input notEmpty"
                      id="alternate_phone_number"
                      onChange={(e) => onProgramChange(e)}
                      required
                    />
                    <label className="label-control">
                      Alternate Phone Number
                    </label>
                    <p style={errStyle}>{errObj.alternate_phone_number}</p>
                  </div>
                  <p>Emergency Contact Details</p>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input notEmpty"
                      id="emergency_contactname"
                      onChange={(e) => onProgramChange(e)}
                      required
                    />
                    <label className="label-control">
                      Emergency Contact Name
                    </label>
                    <p style={errStyle}>{errObj.emergency_contactname}</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control-input notEmpty"
                      id="emergency_contactnumber"
                      onChange={(e) => onProgramChange(e)}
                      required
                    />
                    <label className="label-control">
                      Emergency Contact Number
                    </label>
                    <p style={errStyle}>{errObj.emergency_contactnumber}</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input notEmpty"
                      id="emergency_contactrelationship"
                      onChange={(e) => onProgramChange(e)}
                      required
                    />
                    <label className="label-control">
                      Emergency Contact Relationship
                    </label>
                    <p style={errStyle}>
                      {errObj.emergency_contactrelationship}
                    </p>
                  </div>
                  
                  <p>Alternate Emergency Contact Details (optional)</p>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control-input notEmpty"
                      id="emergency_contactname2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Emergency Contact Name
                    </label>
                    <p style={errStyle}>{errObj.emergency_contactname2}</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control-input notEmpty"
                      id="emergency_contactnumber2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Emergency Contact Number
                    </label>
                    <p style={errStyle}>{errObj.emergency_contactnumber2}</p>
                  </div>
                  <div className="form-group mb-5">
                    <input
                      type="text"
                      className="form-control-input notEmpty"
                      id="emergency_contactrelationship2"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">
                      Emergency Contact Relationship
                    </label>
                    <p style={errStyle}>
                      {errObj.emergency_contactrelationship2}
                    </p>
                  </div>
                  <div className="form-group mt-5">
                    <input
                      type="text"
                      className="form-control-input notEmpty"
                      id="languages"
                      onChange={(e) => onProgramChange(e)}
                    />
                    <label className="label-control">Languages</label>
                    <p style={errStyle}>{errObj.languages}</p>
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="about_byuk"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="" selected>
                    Select Option
                  </option>
                  <option value="Email by BYVK" key="Email by BYVK">
                    Email by BYVK
                  </option>
                  <option value="BYVK Website" key="BYVK Website">
                    BYVK Website
                  </option>
                  <option value="BYVK Instagram" key="BYVK Instagram">
                    BYVK Instagram
                  </option>
                  <option value="BYVK FB" key="BYVK FB">
                    BYVK FB
                  </option>
                  <option value="BYVK LinkedIn" key="BYVK LinkedIn">
                    BYVK LinkedIn
                  </option>
                  <option
                    value="Whatsapp groups - BYVK"
                    key="Whatsapp groups - BYVK"
                  >
                    Whatsapp groups - BYVK
                  </option>
                  <option value="TSF Website" key="TSF Website">
                    TSF Website
                  </option>
                  <option value="TSF Instagram" key="TSF Instagram">
                    TSF Instagram
                  </option>
                  <option value="TSF FB" key="TSF FB">
                    TSF FB
                  </option>
                  <option value="TSF WhatsApp" key="TSF WhatsApp">
                    TSF WhatsApp
                  </option>
                  <option value="TSF Email" key="TSF Email">
                    TSF Email
                  </option>
                  <option value="From a friend" key="From a friend">
                    From a friend
                  </option>
                  <option value="other" key="others">
                    Others (please specify)
                  </option>
                </select>
                <label className="label-control">
                  How did you come to know about BYVK
                </label>
                <p style={errStyle}>{errObj.about_byuk}</p>
              </div>
              {otherSource && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    id="about_byuk"
                    onChange={(e) => onProgramChange(e)}
                    required
                  />
                  <label className="label-control">Type Other Source</label>
                  <p style={errStyle}>{errObj.othersource}</p>
                </div>
              )}
              {docs.map((data, index) => {
                return (
                  <>
                    <p style={noteStyle}>
                      Please upload documents carefully, once you uploaded its
                      not able to replace. use (Jpeg/png/pdf/zip)
                    </p>
                    <div
                      className="row"
                      style={{ padding: "10px" }}
                      key={index}
                    >
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
                  </>
                );
              })}
              <h3
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "20px",
                }}
              >
                Fee Structure and Cancellation Policy{" "}
                <span style={{ color: "red" }}>*</span>
              </h3>
              <a href={feesCourseNameUrl} target="_blank" onClick={feesHandler}>
                Click Here to read Fee Cancellation/Refund Policy
              </a>
              {feesClicked && (
                <div className="form-group mt-2">
                  <input
                    type="checkbox"
                    id="fees"
                    onClick={feesAgreementHandler}
                  />
                  <label>Yes- I Agree  all conditions</label>

                  
                </div>
              )}

              <h3
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "20px",
                }}
              >
                Ashram Rules & Regulations
              </h3>
              <a
                href="/rulesregulations"
                target="_blank"
                onClick={rulesHandler}
              >
                Click Here to read Ashram Rules & Regulations{" "}
                <span style={{ color: "red" }}>*</span>
              </a>

              {rulesClicked && (
                <div className="form-group mt-2">
                  <input
                    type="checkbox"
                    id="rules"
                    onClick={rulesAgreementHandler}
                  />
                  <label>Yes - I Agree  conditions</label>

                  
                </div>
              )}

              <h3
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "20px",
                }}
              >
                Terms & Conditions
              </h3>
              <a href="/termsconditions" target="_blank" onClick={termsHandler}>
                Click Here to read Terms & Conditions
              </a>
              {termsClicked && (
                <div className="form-group mt-2">
                  <input
                    type="checkbox"
                    id="t&c"
                    onClick={termsAgreementHandler}
                  />
                  <label>
                    Yes , I Agree All Conditions
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
              )}

              <label>
                     <span style={{ color: "orange" }}>Note: Agreeing to the terms and conditions, fee structures, rules and regulation etc is mandatory to submit the application 
                   </span>
                    </label>
              {termsAgreed && rulesAgreed && feesAgreed ? (
                <div className="form-group mt-4">
                  <button
                    type="submit"
                    className="form-control-submit-button"
                    onClick={(e) => validateProgramData(e)}
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="form-group mt-4">
                  <button type="submit" className="form-control" disabled>
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterProgram;
