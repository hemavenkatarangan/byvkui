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

const noteStyle = {
	color:"#e5b212",
	textAlign:"center",
	fontSize: ".9rem",
}

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
    age:"",
    gender:"",
    dob:"",
    maritalstatus:"",
    qualification:"",
    occupation:"",
    health_ailments:"",
    lifestyle:"",
    previous_experience:"",
    experty_level:"",
    about_byuk:"",    
  });
  const [errObj, setErrObj] = useState({
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    status: "REGISTERED",
    gender:"",
    age:"",
    dob:"",
    maritalstatus:"",
    qualification:"",
    occupation:"",
    health_ailments:"",
    lifestyle:"",
    previous_experience:"",
    experty_level:"",
    about_byuk:"",
  });
  const [docs, setDocs] = useState([]);
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [isChecked,setIsChecked] = useState(false);
  const [checkedName,setCheckedName] = useState("");
  const [relationship,setRelationship]=useState("Self");
  const [otherOccupation,setOtherOccupation]=useState(false);
  const [prevExperience,setPrevExperience]=useState(false);
  const [otherSource,setOtherSource]=useState(false);

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
	     //console.log(res.data.result,"program data");
        setProgramData(res.data.result);
        axios.get("/courses/"+res.data.result.course).then((res) =>{
		 setCourseData(res.data.result);
	});
        setDocs(res.data.result.required_documents);
      }
    });
  };

  const onProgramChange = (e) => {
	const { id, value } = e.target;
    console.log(id,value,"test");
	if(id === "occupation" && value ==="other"){
		setOtherOccupation(true);
	}
	if(id === "previous_experience" && value ==="Yes"){
		setPrevExperience(true);
	}
	if(id==="about_byuk"  && value=="other"){
		setOtherSource(true);
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
    
    if (program.previous_experience && program.experty_level == "") {
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
    gender:"",
    age:"",
    dob:"",
    maritalstatus:"",
    qualification:"",
    occupation:"",
    health_ailments:"",
    lifestyle:"",
    previous_experience:"",
    experty_level:"",
    about_byuk:"",
      }));
      setProgram((errObj) => ({
        ...errObj,
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "",
    status: "REGISTERED",
    age:"",
    gender:"",
    dob:"",
    maritalstatus:"",
    qualification:"",
    occupation:"",
    health_ailments:"",
    lifestyle:"",
    previous_experience:"",
    experty_level:"",
    about_byuk:"", 
      }));
    }
  };

  const submitProgram = () => {
	var obj = {};
	if(isChecked){
		obj = {
	      program_id: props.match.params.id,
	      user_id: user.user.id,
	      user_name:checkedName,
	      user_email:user.user.name,
	      address_1: program.address_1,
	      address_2: program.address_2,
	      city: program.city,
	      state: program.state,
	      country: program.country,
	      status: "REGISTERED",
	      reject_reason: "",
	      registered_by:user.user.name,
	      relationship:relationship,
	      age:program.age,
	      date_of_birth:program.dob,
	      gender:program.gender,
	      qualification:program.qualification,
	      occupation:program.occupation,
	      //health_ailments:program.health_ailments,
	      lifestyle:program.lifestyle,
	      previous_experience:program.previous_experience,
	      experty_level:program.experty_level,
	      about_byuk:program.about_byuk,
	    };	
	}else{
		obj = {
	      program_id: props.match.params.id,
	      user_id: user.user.id,
	      user_name: user.user.username,
	      user_email:user.user.name,
	      address_1: program.address_1,
	      address_2: program.address_2,
	      city: program.city,
	      state: program.state,
	      country: program.country,
	      status: "REGISTERED",
	      reject_reason: "",
	      registered_by:user.user.name,
	      relationship: relationship,
	      age:program.age,
	      date_of_birth:program.dob,
	      gender:program.gender,
	      qualification:program.qualification,
	      occupation:program.occupation,
	      //health_ailments:program.health_ailments,
	      lifestyle:program.lifestyle,
	      previous_experience:program.previous_experience,
	      experty_level:program.experty_level,
	      about_byuk:program.about_byuk,
	    };	
	}

    axios
      .post("/usermanagement/", obj)
      .then((res) => {
        console.log(res);
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
  
  const handleCheckboxChange = (e) => {
	if (e.target.checked){
		setIsChecked(true);
		document.getElementById('userName').value='';
	}else{
		setIsChecked(false);
	}
	
}

	const checkNameHandler = (e) => {
		setCheckedName(e.target.value);
	}
	
	const relationshipChangeHandler=(e)=>{
		setRelationship(e.target.value);
	}

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
  				<input className="form-check-input" type="checkbox" value="" id="checked" onChange={handleCheckboxChange}/>
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
                />):(<input
                  type="text"
                  className="form-control-input notEmpty"
                  value={user.userData.first_name}
                  id="userName"
                  required
                  disabled
                />)}
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
                <option value="" key="" selected></option>
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
                <label className="label-control">
                  Gender 
                </label>
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
                <label className="label-control">
                  Age
                </label>
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
                <label className="label-control">
                  Date of Birth
                </label>
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
                   {isChecked?( <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="relationship"
                  required
                  onChange={relationshipChangeHandler}
                ><option value="Parent" key="parent">
                        Parent
                      </option>
                      <option value="Spouse" key="spouse">
                        Spouse
                      </option>
                      <option value="Self" key="self" selected>
                        Self
                      </option>
                      
                </select>
                <label className="label-control">
                  Relationship 
                </label>
              </div>):(<div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="relationship"
                  disabled
                  required
                ><option value="Parent" key="parent">
                        Parent
                      </option>
                      <option value="Spouse" key="spouse">
                        Spouse
                      </option>
                      <option value="Self" key="self" selected>
                        Self
                      </option>
                      
                </select>
                <label className="label-control">
                  Relationship 
                </label>
              </div>)}      
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
                <option value="" selected></option>
                <option value="Single" key="single">
                        Single
                      </option>
                      <option value="Married" key="married">
                        Married
                      </option>
                      <option value="Rather Not Say" key="rather not say">
                        Rather Not Say
                      </option>
                </select>
                <label className="label-control">
                  Marital Status 
                </label>
              <p style={errStyle}>{errObj.maritalstatus}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="qualification"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                <option value="" selected></option>
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
                <label className="label-control">
                  Qualification 
                </label>
                <p style={errStyle}>{errObj.qualification}</p>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="occupation"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                <option value="" selected></option>
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
                <label className="label-control">
                  Occupation 
                </label>
                <p style={errStyle}>{errObj.occupation}</p>
              </div>
              {otherOccupation && (<div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  id="occupation"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control">
                  Type The Occupation Here
                </label>
                <p style={errStyle}>{errObj.otheroccupation}</p>
              </div>  )}
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
                <select
                  className="form-control-input notEmpty"
                  id="qualification"
                  required
                >
                
                
                
                </select>
                <label className="label-control">
                  Health/Ailments 
                </label>
              </div>
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="lifestyle"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
                <option value="" selected></option>
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
                <label className="label-control">
                  Lifestyle 
                </label>
               	<p style={errStyle}>{errObj.lifestyle}</p>
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
                ><option value="Yes" key="yes">
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
              {prevExperience && (<div className="form-group">
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
                <label className="label-control">
                 	Experty Level 
                </label>
                <p style={errStyle}>{errObj.experty_level}</p>
              </div>)}
              <div className="form-group">
                <select
                  className="form-control-input notEmpty"
                  id="about_byuk"
                  onChange={(e) => onProgramChange(e)}
                  required
                >
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
				<option value="Whatsapp groups - BYVK" key="Whatsapp groups - BYVK">
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
              {otherSource && (<div className="form-group">
                <input
                  type="text"
                  className="form-control-input notEmpty"
                  id="about_byuk"
                  onChange={(e) => onProgramChange(e)}
                  required
                />
                <label className="label-control">
                  Type Other Source 
                </label>
                <p style={errStyle}>{errObj.othersource}</p>
              </div>  )}            				
              {docs.map((data, index) => {
                return (
				<>
				<p style={noteStyle}>
                	Please upload documents carefully, once you uploaded its not
                	able to replace. use (Jpeg/png/pdf/zip)
              	</p>
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
                  </>
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
