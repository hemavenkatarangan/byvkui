import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import axios from "axios";
import { Country, State, City } from "country-state-city";
import PhoneInput from 'react-phone-number-input';


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


function CompleteProfile(props) {

  const user = useSelector((state) => state.auth);
   const [profile, setProfile] = useState({
	first_name : "",
	last_name : "",
	email_id : "",
	phone_num : "",
	gender : "",
	dob : "",
	age : "",
    address_1 : "",
    address_2 : "",
    city: "",
    state: "",
    country: "",
    nationality: "",
    qualification: "",
   	maritalstatus: "",
   	occupation:"",
   	occupation_details: "",
   	languages: "",
   	experty_level: "",
   	previous_experience:"No",
   	about_byuk: "",
   	other_source:""
  });
  const [errObj, setErrObj] = useState({
	first_name : "",
	last_name : "",
	email_id : "",
	phone_num : "",
	gender : "",
	dob :"",
	age : "",
    address_1 : "",
    address_2 : "",
    city: "",
    state: "",
    country: "",
    nationality: "",
    qualification: "",
   	maritalstatus: "",
   	occupation:"",
   	occupation_details: "",
   	languages: "",
   	experty_level: "",
   	previous_experience:"No",
   	about_byuk: "",
   	other_source:""
  });
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [prevExperience, setPrevExperience] = useState(false);
  const [otherSource, setOtherSource] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const getFormatedDate = (date) => {
    // console.log("formatting......")
    if(date)
    return moment(date).format("YYYY-MM-DD");
  };
  useEffect(() => {
	
	
	document.getElementById('gender').value =user.userData.gender;
	document.getElementById('dob').value =getFormatedDate(user.userData.dob);
	profile.first_name=user.userData.first_name;
	profile.last_name=user.userData.last_name;
	profile.email_id=user.userData.email_id;
	profile.dob=user.userData.dob;
	profile.age=user.userData.age;
	profile.gender=user.userData.gender;
	profile.phone_num=user.userData.phone_num;
	
	console.log("DAte of birth "+user.userData.dob)
    setCheckedName(user.userData.first_name);
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
   console.log(profile,"program");
    updateStateCityCounty();
   
  }, []);

  const updateStateCityCounty = () => {
    setCountry(Country.getAllCountries());
   
  };

 

  const onProgramChange = (e) => {

    const { id, value } = e.target;
        if (id === "country" || id === "state") {
      getDataBasedOnSelection(id, value);
    }
        if (id === "previous_experience" && value === "Yes") {
      setPrevExperience(true);
    }
    if (id=== "previous_experience" && (value === "No" || value === "S_O")){
		setPrevExperience(false);
	}
	    if (id === "about_byuk" && value == "other") {
      setOtherSource(true);
    } else {
      setOtherSource(false);
    }

    setProfile((profile) => ({ ...profile, [id]: value }));

  };

   const getDataBasedOnSelection = (id, value) => {
    if (id === "country") {
      setStates(State.getStatesOfCountry(value));
      // console.log(states);
    } else if (id === "state") {
      setCity(City.getCitiesOfState(profile.country, value));
      // console.log(city);
    }
    setProfile((profile) => ({ ...profile, [id]: value }));
  };

  const validateProfileData = () => {
	console.log("Validating form ");
	
    let valid = true;
    
    if (profile.address_1.length < 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        address_1: "Address 1 should be More than 3 letters",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        address_1: "",
      }));
    }
     if (profile.address_2.length < 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        address_2: "Address 2 should be More than 3 letters",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        address_2: "",
      }));
    }
    
    
     if (profile.gender == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        gender: "Please Select The Gender",
      }));
     
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        gender: "",
      }));
    }

     if (profile.dob == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        dob: "Please Select The Date of Birth",
      }));
      console.log("Please select the date of birth");
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        dob: "",
      }));
    }

    if (profile.maritalstatus == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        maritalstatus: "Please Select The Marital Status",
      }));
      console.log("Please select marital status ");
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        maritalstatus: "",
      }));
    }
if (profile.city.length <= 1) {

      setErrObj((errObj) => ({
        ...errObj,
        city: "City is mandatory, Please select",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        city: "",
      }));
    }
    
    if (profile.languages == "") {

      setErrObj((errObj) => ({
        ...errObj,
        languages: "Language is mandatory,Please specify languages",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        languages: "",
      }));
    }

    if (profile.state.length <= 1) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        state: "State is mandatory,Please select",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        state: "",
      }));
    }

    if (profile.country.length <= 1) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        country: "Country is mandatory,Please select",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        country: "",
      }));
    }
    if (profile.qualification == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        qualification: "Please Select The Qualification",
      }));
      console.log("Please select qualification")
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        qualification: "",
      }));
    }

    if (profile.occupation == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        occupation: "Please Select The Occupation",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        occupation: "",
      }));
    }
    console.log("Nationality " + profile.nationality);
    if (profile.nationality == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        nationality: "Please Select Nationality",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        nationality: "",
      }));
    }
    
     if (prevExperience && profile.experty_level == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        experty_level: "Please Select Experience Level",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        experty_level: "",
      }));
    }

    if (profile.about_byuk == "") {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        about_byuk: "Please Select The Option for About BYVK",
      }));
    }
    else {

      setErrObj((errObj) => ({
        ...errObj,
        about_byvk: "",
      }));
    }


if (profile.experty_level == "") {
     profile.experty_level="Beginner"
    }
    if (valid) {
     	submitProfile();
    }
    	console.log(profile);
    console.log("End of validation");
  };

  const clearAllData = () => {
    setProfile((profile) => ({
    first_name : user.userData.first_name,
	last_name : user.userData.last_name,
	email_id : user.userData.email_id,
	phone_num : user.userData.phone_num,
	gender : user.userData.gender,
	dob : user.userData.dob,
	age : user.userData.age,
    address_1 : "",
    address_2 : "",
    city: "",
    state: "",
    country: "",
    nationality: "",
    qualification: "",
   	maritalstatus: "",
   	occupation:"",
   	occupation_details: "",
   	languages: "",
   	experty_level: "",
   	previous_experience:"No",
   	about_byuk: "",
    }));
  }

  const submitProfile = () => {
	console.log("Submitting form ...");
    var obj = {};
    
      obj = {
	
	first_name : profile.first_name,
	last_name : profile.last_name,
	email_id : profile.email_id,
	phone_num : profile.phone_num,
	gender : profile.gender,
	dob : profile.dob,
	age : profile.age,
    address_1 : profile.address_1,
    address_2 : profile.address_2,
    city: profile.city,
    state: profile.state,
    country: profile.country,
    nationality: profile.nationality,
    qualification: profile.qualification,
   	maritalstatus: profile.maritalstatus,
   	occupation: profile.occupation,
   	occupation_details: profile.occupation_details,
   	languages: profile.languages,
   	experty_level: profile.experty_level,
   	previous_experience: profile.previous_experience,
   	about_byuk: profile.about_byuk,
      };

console.log(obj,"obj");

//Saving to db

axios
      .post("/profile/", obj)
      .then((res) => {
      console.log(res);
       
	});
//saving to db
  
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
                Complete Your Profile
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
              </div>
              <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    value={profile.first_name + " " + profile.last_name}
                    id="userName"
                    required
                    disabled
                  />
                <label className="label-control" htmlFor="name">
                  Name <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="form-group">
                 <select
                  className="form-control-input notEmpty"
                  id="gender"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="S_O" key="" selected>
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
                <label className="label-control">Gender<span style={{ color: "red" }}>*</span> </label>
                <p style={errStyle}>{errObj.gender}</p>
              </div>
              <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    value={"+"+profile.phone_num}
                    id="phone_num"
                    required
                    
                  />
                <label className="label-control" htmlFor="phone_num">
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    value={profile.age}
                    id="age"
                    required
                    onInput={(e) => onProgramChange(e)}
                  />
                <label className="label-control" htmlFor="age">
                  Age <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control-input notEmpty"
                  id="dob"
                 onInput={(e) => onProgramChange(e)}
                 value={getFormatedDate(profile.dob)}
                  
                />
                <label className="label-control">Date of Birth <span style={{ color: "red" }}>*</span></label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  value={profile.address_1}
                  id="address_1"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="address_1">
                  Address 1 <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.address_1}</p>
              </div>
              <div className="form-group">
                <input
                  type="textarea"
                  className="form-control-input notEmpty"
                  value={profile.address_2}
                  id="address_2"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control" htmlFor="address_2">
                  Address 2 <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.address_2}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="country"
                  onChange={(e) => onProgramChange(e)}
                  value={profile.country}
                  required
                >
                  <option value="S_O" key="c" selected>
                    Select Option
                  </option>
                  {country.map((country, index) => {
                    return (
                      <option value={country.isoCode} key={index}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>

                <label className="label-control" htmlFor="max_age">
                  Country <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.country}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="state"
                  onChange={(e) => onProgramChange(e)}
                  value={profile.state}
                  required
                >
                  <option value="S_O" key="s" selected>
                    Select Option
                  </option>
                  {states.map((state, index) => {
                    return (
                      <option value={state.isoCode} key={index}>
                        {state.name}
                      </option>
                    );
                  })}
                </select>
                <label className="label-control" htmlFor="min_age">
                  State <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.state}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="city"
                  onChange={(e) => onProgramChange(e)}
                  value={profile.city}
                  required
              >
                  <option value="S_O" key="ci" selected>
                    Select Option
                  </option>
                  <option value="other" key="other" >
                    Others
                  </option>
                  {city.map((city, index) => {
                    return (
                      <option value={city.name} key={index}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
                <label className="label-control" htmlFor="city">
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <p style={errStyle}>{errObj.city}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  onChange={(e) => onProgramChange(e)}
                  id="nationality"
                  required
                >
                  <option value="S_O" key="" selected>
                    Select Option
                  </option>
                  <option value="Indian" key="indian">
                    Indian
                  </option>
                  <option value="NRI" key="nri">
                    NRI
                  </option>
                  <option value="International" key="International">
                    International
                  </option>

                </select>
                <label className="label-control">Nationality <span style={{ color: "red" }}>*</span></label>
                <p style={errStyle}>{errObj.nationality}</p>
              </div>
                            <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  onChange={(e) => onProgramChange(e)}
                  id="maritalstatus"
                  required
                >
                  <option value="S_O" key="" selected>
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
                <label className="label-control">Marital Status <span style={{ color: "red" }}>*</span></label>
                <p style={errStyle}>{errObj.maritalstatus}</p>
              </div>
                            <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="qualification"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="S_O" key="" selected>
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
                <label className="label-control">Qualification <span style={{ color: "red" }}>*</span></label>
                <p style={errStyle}>{errObj.qualification}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="occupation"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="S_O" key="" selected>
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
                <label className="label-control">Occupation <span style={{ color: "red" }}>*</span></label>
                <p style={errStyle}>{errObj.occupation}</p>
              </div>
                            <div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  id="languages"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control">Language<span style={{ color: "red" }}>*</span></label>
                <p style={errStyle}>{errObj.languages}</p>
              </div>
              
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
                  <option value="S_O" key="" selected>
                    Select Option
                  </option>
                  <option value="Yes" key="yes">
                    Yes
                  </option>
                  <option value="No" key="no" selected>
                    No
                  </option>
                </select>
                <label className="label-control">
                  Any Previous Yoga Experience <span style={{ color: "red" }}>*</span>
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
                    <option value="S_O" key="" selected>
                      Select Option
                    </option>
                    <option value="Beginner" key="beginner">
                      Beginner
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
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="about_byuk"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                  <option value="S_O" key="" selected>
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
                  How did you come to know about BYVK <span style={{ color: "red" }}>*</span>
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
                  <p style={errStyle}>{errObj.other_source}</p>
                </div>
              )}
                <div className="form-group mt-4">
                    <div className="form-group mt-4">
                      <button
                        type="submit"
                        className="form-control-submit-button"
                        onClick={(e) => validateProfileData(e)}
                      >
                        Submit
                      </button>
                    </div>
            	</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteProfile;
