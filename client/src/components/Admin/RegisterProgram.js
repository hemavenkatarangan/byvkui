import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// import { Checkbox, Popover } from "antd";
import { Checkbox } from "antd";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import fileUploadUrl from "../../constants/constants";
import Termsconditions from "../Rules/Termsconditions";
import Terms from "../Rules/Terms";
import Refund from "../Rules/Refund";
import Rulesregulations from "../Rules/Rulesregulations";
import PhoneInput from 'react-phone-number-input';
import moment from "moment";

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

	{ value: "Ligament Injuries", label: "Ligament Injuries" },
	{ value: "Osteoporosis", label: "Osteoporosis" },
	{ value: "Seizure/ Epilepsy", label: "Seizure/ Epilepsy" },
	{ value: "Frozen Shoulder", label: "Frozen Shoulder" },
	{ value: "Arthritis", label: "Arthritis" },
	{
		value: "Vitamin Deficiency (esp. Vitamin B12 & D)",
		label: "Vitamin Deficiency (esp. Vitamin B12 & D)",
	},
];

const healthOptions2 = [
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
	{ value: "Pregnancy", label: "Pregnancy" },
	{ value: "None of the Above", label: "None of the Above" },
	,
	{ value: "other", label: "Other" }
];

function RegisterProgram(props) {

	const user = useSelector((state) => state.auth);
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [isLogged, setLogged] = useState(true);
	const [isValidAge, setValidAge] = useState(true);
	const [courseData, setCourseData] = useState([]);
	const [programData, setProgramData] = useState([]);
	const [noneClicked, setNoneClicked] = useState(false);
	const [frequencyUse, setFrequencyUse] = useState(false);
	const [prevTeachingExp, setPrevTeachingExp] = useState(false);
	const [planningToTeachSelected, setPlanningToTeachSelected] = useState(false);
	const [program, setProgram] = useState({
		address_1: "",
		address_2: "",
		user_email: "",
		user_name: "",
		phoneNum: "",
		city: "",
		state: "",
		country: "",
		status: "APPLICATION_SUBMITTED",
		age: "",
		gender: "",
		dob: "",
		nationality: "",
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
		user_email: "",
		user_name: "",
		phoneNum: "",
		state: "",
		country: "",
		status: "APPLICATION_SUBMITTED",
		gender: "",
		age: "",
		dob: "",
		nationality: "",
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
		covid_vaccine_dose: "",
		tobbaco_consumption: "",
		frequency_details_of_tobaaco_use: "",
		role_of_yoga_teacher: "",
		planning_to_teach: "",
		why_teach_yoga: "",
		teaching_experience: "",
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
	const [checkedHealth1, setCheckedHealth1] = useState([]);
	const [checkedHealth2, setCheckedHealth2] = useState([]);
	const [termsClicked, setTermsClicked] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);
	const [rulesClicked, setRulesClicked] = useState(false);
	const [rulesAgreed, setRulesAgreed] = useState(false);
	const [feesClicked, setFeesClicked] = useState(false);
	const [feesAgreed, setFeesAgreed] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [calculatedAge, setCalculatedAge] = useState("");
	const [feeStructure, setFeeStructure] = useState(false);
	const [termsDisplay, setTermsDisplay] = useState("none");
	const [declarationsDisplay, setDeclarationsDisplay] = useState("none");
	const [modalData, setModalData] = useState("");
	const [typeHandler, setTypeHandler] = useState("");
	const ref = useRef(null);
	const [maritialStatus, setMaritialStatus] = useState("");
	const [currentProfileData, setCurrentProfileData] = useState({
		first_name: "",
		last_name: "",
		email_id: "",
		phone_num: "",
		gender: "",
		dob: "",
		age: "",
		address_1: "",
		address_2: "",
		city: "",
		state: "",
		country: "",
		nationality: "",
		qualification: "",
		maritalstatus: "",
		occupation: "",
		occupation_details: "",
		languages: "",
		experty_level: "",
		previous_experience: "No",
		about_byuk: ""
	});



	useEffect(() => {
		console.log(user.userData);
		if (!user || !user.userData) {
			setLogged(false);
		}
		else {
			setPhoneNumber(user.userData.phone_num);
			setCheckedName(user.userData.first_name);
			program.user_email = user.userData.email_id;

			getProfileInfor(user.userData.email_id);
			if (user.isAuthenticated) {
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
			}
		}
		getProgramData();

		updateStateCityCounty();

	}, []);

	const updateStateCityCounty = () => {
		setCountry(Country.getAllCountries());

	};
	const getProfileInfor = (emailId) => {

		axios.get("/profile/" + emailId).then((res) => {

			if (res.data.status_code === "200") {

				for (var i = 0; i < res.data.result.length; i++) {
					if ((res.data.result[i].first_name === user.userData.first_name) && (res.data.result[i].last_name === user.userData.last_name)) {
						setCurrentProfileData(res.data.result[i]);
						setCalculatedAge(res.data.result[i].age)
						console.log("Profile data");
						console.log(res.data.result[i]);
						
						
						
						if (res.data.result[0].country != "") {
							setStates(State.getStatesOfCountry(res.data.result[0].country));
						}
						if (res.data.result[0].state != "") {
							setCity(City.getCitiesOfState(res.data.result[0].country, res.data.result[0].state));
						}

					}
				}

			}
		});

	}
	const getFormatedDate = (date) => {
		// console.log("formatting......")
		if (date)
			return moment(date).format("DD-MMM-YYYY");
	};
	const getProgramData = () => {
		console.log(props.match.params.id);
		console.log("Getting program info");
		axios.get("/programs/" + props.match.params.id).then((res) => {
			if (res.data.status_code === "200") {
				
				setProgramData(res.data.result);
				if (res.data.result.program_type == "OFFLINE") {
					setResidentialCourse(true);
				}
				axios.get("/courses/" + res.data.result.course).then((res) => {
					setCourseData(res.data.result);
					console.log("Course data ", res.data.result)
				});
				setDocs(res.data.result.required_documents);
			}
		});
	};

	const onProgramChange = (e) => {

		const { id, value } = e.target;
		
		if (id === "dob") {
			calculateAge(value);
		}
		if (id === 'tobbaco_consumption') {
			if (value === "Yes") {
				setFrequencyUse(true);
			} else {
				setFrequencyUse(false);
			}
		}
		if (id === "previous_experience") {
			if (value === "Yes") {
				setPrevExperience(true);
			} else {
				setPrevExperience(false);
			}
		}
		if (id === "teaching_experience") {
			if (value === "Yes") {
				setPrevTeachingExp(true);
			} else {
				setPrevTeachingExp(false);
			}
		}
		if (id === "planning_to_teach") {
			if (value === "Yes") {
				setPlanningToTeachSelected(true);
			} else {
				setPlanningToTeachSelected(false);
			}
		}
		
		if (id === "about_byuk" && value == "other") {
			setOtherSource(true);
		} else {
			setOtherSource(false);
		}
		if (id === "country" || id === "state") {
			getDataBasedOnSelection(id, value);
		}
		setProgram((program) => ({ ...program, [id]: value }));

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
		     program.address_1 = currentProfileData.address_1;
			 program.address_2 = currentProfileData.address_2;
			 program.dob=currentProfileData.dob;
			 program.city=currentProfileData.city;
			 program.state = currentProfileData.state;
			 program.country=currentProfileData.country;
			 program.occupation=currentProfileData.occupation;
			 program.occupation_details=currentProfileData.occupation_details;
			 program.maritalstatus=currentProfileData.maritalstatus;
			 program.previous_experience=currentProfileData.previous_experience;
		
		if (!isValidAge) {
			alert(
				"Your Age does not meet event criteria, your age should between " +
				programData.min_age +
				" & " +
				programData.max_age +
				" age "
			);
			ref.current.focus();
		}
		let valid = true;
		const concateArray = checkedHealth1.concat(checkedHealth2);
		setCheckedHealth(concateArray);
		program.health_ailments=concateArray;
		setProgram({ ...program });
         
        

		if (isChecked && program.gender == "" && currentProfileData.gender == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				gender: "Please Select The Gender",
			}));
			console.log("Gender selection failed , please select ");

		}
		else {
			console.log("Gender checking ")
            program.gender = currentProfileData.gender;
   		    setProgram({ ...program });
			setErrObj((errObj) => ({
				...errObj,
				gender: "",
			}));
		}

		
		console.log(program,"Validated program ");
		if (calculatedAge == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				age: "Please Select The Date of Birth in the above field Properly",
			}));
			console.log("Please Select The Date of Birth in the above field Properly ");
		}
		else {
             program.age=calculatedAge;
              setProgram({ ...program });
			setErrObj((errObj) => ({
				...errObj,
				age: "",
			}));
		}
		console.log(
			"Validation till here afe" +
			valid +
			" program type " +
			residentialCourse +
			" age " +
			calculatedAge
		);
		if (isChecked && program.dob == "" && currentProfileData.dob == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				dob: "Please Select The Date of Birth",
			}));
			console.log("Please select the date of birth");
		}
		else {
		 	
            program.dob = currentProfileData.dob;
    		setProgram({ ...program });
			setErrObj((errObj) => ({
				...errObj,
				dob: "",
			}));
		}
		if (program.user_email == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				user_email: "Please Enter Email Id",
			}));
			console.log("Please Enter Email Id");
		}
		else {

			setErrObj((errObj) => ({
				...errObj,
				user_email: "",
			}));
		}

		if (phoneNumber == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				phoneNum: "Please Enter Phone number",
			}));
			console.log("Please Enter Phone number");
		}
		else {
            program.phoneNum = phoneNumber;
             setProgram({ ...program });
			setErrObj((errObj) => ({
				...errObj,
				phoneNum: "",
			}));
		}
		
		if ((isChecked || !isLogged) && (program.country === "" || program.country === "S_O") && currentProfileData.country == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				country: "Please Select country",
			}));
			console.log("Please Select country")
		}
		else {
          
            program.country = currentProfileData.country;
            setProgram({ ...program });
			setErrObj((errObj) => ({
				...errObj,
				country: "",
			}));
		}
		
		console.log("Validated till country "+valid);
		if (!residentialCourse && program.health_conditions == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				health_conditions: "Please Enter your Health Conditions",
			}));
		}
		else {
            
			setErrObj((errObj) => ({
				...errObj,
				health_conditions: "",
			}));
		}
		console.log("Validated till health conditions "+valid);

		if (
			courseData.course_name === "SakhyaM" &&
			program.tobbaco_consumption == "S_O"
		) {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				tobbaco_consumption: "Please Select the Field ",
			}));
		}
		else {

			setErrObj((errObj) => ({
				...errObj,
				tobbaco_consumption: "",
			}));
		}

		if (
			courseData.course_name === "SakhyaM" &&
			program.tobbaco_consumption == "Yes"
		) {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				frequency_details_of_tobaaco_use: "You have chosen the tobacco consumption as Yes, So please enter details ",
			}));
		}
		else {

			setErrObj((errObj) => ({
				...errObj,
				frequency_details_of_tobaaco_use: "",
			}));
		}


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
console.log("Validated till contactrelationship "+valid);
		
		if (residentialCourse && program.medicines_details == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				medicines_details: "Please enter your medicines details",
			}));
		}
console.log("Validated till medicine details "+valid);
		if (residentialCourse && program.covid_vaccine_dose == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				covid_vaccine_dose: "Please select the option",
			}));
		}
		console.log("Validation till here covid vaccine dose" + valid);
		
		
		if (courseData.course_name === "T T C" && (program.planning_to_teach == "" || program.planning_to_teach == "S_O")) {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				planning_to_teach: "Please select an option",
			}));
		}
		console.log("Validated till planning to teach "+valid);
		if (courseData.course_name === "T T C" && program.planning_to_teach == "Yes" && program.why_teach_yoga == "") {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				why_teach_yoga: "Please enter why you wanna teach yoga",
			}));
		}
		console.log("Validation till here why teach yoga" + valid);
		if (
			courseData.course_name === "T T C"   && program.planning_to_teach == "Yes" &&
			program.teaching_experience_description == ""
		) {
			valid = false;
			setErrObj((errObj) => ({
				...errObj,
				teaching_experience_description: "Please Do not leave this feild blank",
			}));
		}
        console.log("Validated till teaching experience "+valid);
		
		
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
		console.log("Validation till here rules agreed" + valid);
		program.user_name = checkedName;
		console.log(program, "submit program values");
		if (!isChecked)
			if (valid) {

				submitProgram();
			}
	};



	const submitProgram = () => {
		var obj = {};
		var lstyle = "None";
		if (isChecked) {
			if (!residentialCourse) {
				lstyle = "None";
			}
			else {
				lstyle = program.lifestyle;
			}
			var email = program.user_email;
			if (isLogged) {
				email = user.userData.email_id;
			}

			obj = {
				program_id: props.match.params.id,
				user_id: user.user.id,
				user_name: checkedName,
				user_email: email,
				phoneNum: phoneNumber,
				address_1: program.address_1,
				address_2: program.address_2,
				city: program.city,
				state: program.state,
				country: program.country,
				status: "APPLICATION_SUBMITTED",
				reject_reason: "",
				registered_by: user.user.name,
				relationship: relationship,
				age: calculatedAge,
				nationality: program.nationality,
				maritalstatus: program.maritalstatus,
				date_of_birth: program.dob,
				gender: program.gender,
				qualification: program.qualification,
				occupation: program.occupation,
				occupation_details: program.occupation_details,
				health_ailments: checkedHealth,
				lifestyle: lstyle,
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
			
			var user_id = "";
			var user_email = program.user_email;
			var user_name = checkedName;
			var gender = user.userData.gender;


			console.log("PRogram email " + program.user_email + " checked name " + checkedName);

			obj = {

				program_id: props.match.params.id,
				user_id: user_id,
				user_name: user_name,
				user_email: user_email,
				phoneNum: phoneNumber,
				address_1: program.address_1,
				address_2: program.address_2,
				city: program.city,
				state: program.state,
				country: program.country,
				nationality: program.nationality,
				maritalstatus: currentProfileData.maritalstatus,
				status: "APPLICATION_SUBMITTED",
				reject_reason: "",
				registered_by: user.user.name,
				relationship: relationship,
				age: calculatedAge,
				date_of_birth: program.dob,
				gender: gender,
				qualification: program.qualification,
				occupation: program.occupation,
				health_ailments: checkedHealth,
				lifestyle: lstyle,
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

				if (res.data.status_code === "200") {
					if (residentialCourse) {
						alert(
							"You have successfully registered for Event ,Please Wait for Verification to be done !!!"
						);

						setTimeout(function() {
							window.location.href = "/home";
						}, 300);
					} else {
						if (courseData.course_name === "KausalaM") {
							alert(
								"You have successfully registered for Event ,Please Wait for Verification to be done !!!"
							);
							setTimeout(function() {
								window.location.href = "/home";
							}, 300);
						} else {
							alert(
								"You have successfully registered for the event.Please proceed to the payment section"
							);
							setTimeout(function() {
								let paymentsfeesCourseNameUrl = "";
								console.log(program.nationality);
								console.log(program.country);

								if (program.nationality === "Indian" || program.country === "IN") {
									paymentsfeesCourseNameUrl =
										"/payments?fees=" +
										programData.program_fee +
										"&usdfees=0" +
										"&course_name=" +
										programData.name +
										"&user_name=" +
										checkedName +
										"&c_id=" +
										window.location.href.split("/")[window.location.href.split("/").length - 1] +
										"&userManagementId=" + res.data.result._id;
								}
								else {
									paymentsfeesCourseNameUrl =
										"/payments?fees=0" +
										"&usdfees=" + programData.program_fee_in_usd +
										"&course_name=" +
										programData.name +
										"&user_name=" +
										checkedName +
										"&c_id=" +
										window.location.href.split("/")[window.location.href.split("/").length - 1] +
										"&userManagementId=" + res.data.result._id;

								}
								console.log(paymentsfeesCourseNameUrl)
								window.location.href = paymentsfeesCourseNameUrl;
							}, 300);
						}
					}

					//SEnding mail
					var mailObject = {
						to_address: program.user_email,
						subject: programData.name + " application received",
						email_body: "",
						name: checkedName,
						course: courseData.course_name,
						event_start_date: getFormatedDate(programData.program_start_date)
					}
					axios
						.post("/mailservice/sendmailforregistration", mailObject)
						.then((res) => {

							console.log(res);
						});
					//Sending mail
				} else {
					alert(res.data.status_message);
				}
				setErrObj((errObj) => ({
					...errObj,
					program_id: props.match.params.id,
					user_id: user.user.id,
					user_name: checkedName,
					user_email: program.user_email,
					phoneNum: phoneNumber,
					address_1: "",
					address_2: "",
					city: "",
					state: "",
					country: "",
					status: "APPLICATION_SUBMITTED",
					age: "",
					gender: "",
					dob: "",
					nationality: "",
					maritalstatus: "",
					qualification: "",
					occupation: "",
					occupation_details: "",
					health_ailments: "",
					lifestyle: "None",
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
					covid_vaccine_dose: "",
					tobbaco_consumption: "",
					frequency_details_of_tobaaco_use: "",
					role_of_yoga_teacher: "",
					planning_to_teach: "",
					why_teach_yoga: "",
					teaching_experience: "",
					teaching_experience_description: "",
					attraction_to_yoga_path: "",
					meditation_practices: "",
					terms_agreed: "No",
					rules_agreed: "No",
					fees_agreed: "No",
				}));
				setProgram((errObj) => ({
					...errObj,
					user_id: user.user.id,
					user_name: "",
					user_email: "",
					phoneNum: "",
					address_1: "",
					address_2: "",
					city: "",
					state: "",
					country: "",
					status: "APPLICATION_SUBMITTED",
					age: "",
					gender: "",
					dob: "",
					nationality: "",
					maritalstatus: "",
					qualification: "",
					occupation: "",
					occupation_details: "",
					health_ailments: "",
					lifestyle: "None",
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
					covid_vaccine_dose: "",
					tobbaco_consumption: "",
					frequency_details_of_tobaaco_use: "",
					role_of_yoga_teacher: "",
					planning_to_teach: "",
					why_teach_yoga: "",
					teaching_experience: "",
					teaching_experience_description: "",
					attraction_to_yoga_path: "",
					meditation_practices: "",
					terms_agreed: "No",
					rules_agreed: "No",
					fees_agreed: "No",
				}));
			})
			.catch((err) => {
				console.log("Error in registering please check logs ");
				console.log(err);

				alert(
					"Your email id is already registered for the event"
				);
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
			var user_id = "";

			if (user.userData) {
				user_id = user.userData._id;
			}
			else {
				user_id = "Nologged_id";
			}
			axios
				.post(fileUploadUrl, form)
				.then((res) => {
					let obj = {
						document_path: res.data.result[0],
						document_type: e.target.id,
						user_id: user_id,
						program_id: props.match.params.id,
						email_id: program.user_email,
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
				`Sorry ${program.first_name} the format which you selected ${e.target.files[0].type} is not supported.`
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

	const handleMultiSelect1 = (data) => {
		setCheckedHealth1(data);
	};

	const handleMultiSelect2 = (data) => {
		console.log(data);
		if (data == "None of the Above") {
			setNoneClicked(true);
		} else {
			setNoneClicked(false);
		}
		setCheckedHealth2(data);
	};

	const rulesHandler = () => {
		setTermsDisplay("block");
		setTypeHandler("RULES");
		setModalData(<Rulesregulations />);
	};

	const rulesHandlerClose = () => {
		setRulesClicked(true);
		setTermsDisplay("none");
		setModalData("");
	};

	const feesHandler = () => {
		setTermsDisplay("block");
		setTypeHandler("FEES");
		setModalData(
			<Refund fee={programData.program_fee} name={programData.name} residential={residentialCourse} />
		);
	};

	const feesHandlerClose = () => {
		setFeesClicked(true);
		setTermsDisplay("none");
		setModalData("");
	};

	const termsHandler = () => {
		setTermsDisplay("block");
		setTypeHandler("TERMS");
		if (residentialCourse)
			setModalData(<Termsconditions course_name={courseData.course_name} />);
		else
			setModalData(<Terms />);
	};

	const declarationsHandler = () => {
		setTermsDisplay("block");
		setTypeHandler("DECLARAtIONS");
		setModalData(declarationsSnipet);
	};

	const declarationsHandlerClose = () => {
		setTermsDisplay("none");
		setModalData("");
	};


	const declarationsSnipet = () => {
		return (<>
			<div className="ex-basic-1 pt-4">
				<div className="container">
					<div className="row" style={{ marginTop: '100px' }}>
						<div className="text-container" style={{ marginTop: '45px' }}>
							<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue' }}>Terms and Conditions/Declarations:</h3>
							<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
								By submitting this application, I affirm the statements below:-
							</p>
							<ul>
								<li>
									<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
										1. Bharat Yoga Vidya Kendra (BYVK) and The Satsang Foundation (TSF) would not be held
										responsible for any injuries, damages or health issues that may occur during or after the Yoga Teacher Training Course (TTC).

									</p>
								</li>
								<li>
									<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
										2. All participants are expected to abstain from the consumption of alcohol, tobacco, cigarettes or any other form of recreational substances during the entire length of the course. This applies to the online as well as the residential part of the course.Failure in doing so would result in the cancellation of the participant's registration and they would not be entitled to a refund.</p>
								</li>
								<li>
									<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
										The accommodation would be shared between three to a maximum for five people. </p>
								</li>
								<li>
									<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
										The  AYUSH ministry certification/exam charges and fees (INR 4500) will be borne by the participants separately towards the end of the course.  All the support will be provided by BYVK.
									</p>
								</li>
								<li>
									<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '12px' }}>
										Participants should have a minimum of 95% attendance ( a maximum of 10 missed sessions) during the course to appear for the Ayush ministry exam.
									</p>
								</li>




							</ul>
						</div>
					</div>
				</div>
			</div>
		</>)
	}


	const globalHandler = (e, type) => {
		console.log(type);
		switch (type) {
			case "TERMS":
				termsHandlerClose();
				break;
			case "FEES":
				feesHandlerClose();
				break;
			case "RULES":
				rulesHandlerClose();
				break;
			case "DECLARAtIONS":
				declarationsHandlerClose();
				break;
		}
	};

	const termsHandlerClose = () => {
		setTermsClicked(true);
		setTermsDisplay("none");
		setModalData("");
	};

	const termsAgreementHandler = (event) => {
		if (event.target.checked) {
			setTermsAgreed(true);
		} else {
			setTermsAgreed(false);
		}
	};

	const declarationsAgreementHandler = (event) => {
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

	const feeStructureHandler = (event) => {
		if (event.target.checked) {
			setFeeStructure(true);
		} else {
			setFeeStructure(false);
		}
	};

	const phoneNumberHandler = (e) => {
		// if (e.target.value.length > 10) {
		//   alert("Phone Number should be 10 digits");
		// } else {
		setPhoneNumber(e);

		// }
	};

	const calculateAge = (value) => {
		var today = new Date();
		var birthDate = new Date(value);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		age = age.toString();

		if (!(age >= programData.min_age && age <= programData.max_age)) {
			console.log("block entered for age");
			setValidAge(false);
		} else {
			setCalculatedAge(age);
			setValidAge(true);
		}
	};

	return (
		<>
			<div className="ex-basic-1 pt-5 pb-5" >

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
						<p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'red', fontSize: '12px' }}>
							<b>Eligibility Criteria:</b>
							The participant should be 16 years or older.
							The participant should not have undergone a major surgery in the last 6 months.
							The participant should not be pregnant.
						</p>
					</div>
				</div>

			</div>

			<div className="row" style={{ marginTop: "0px" }} >
				<div className="col-xl-10 offset-xl-1" >


					<h1
						style={{
							fontFamily: "Poppins",
							color: "darkblue",
							fontSize: "20px",
							textAlign: "center",

						}}
					>
						Personal Details
					</h1>
					<div>
					</div>
					{courseData.course_name != 'T T C' && (
						<div className="row">
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
						</div>)}

					<div className="row">
						<div className="col-md-5">
							<div className="form-group">
								<label><b>Program Name: </b>{programData.name} </label>
							</div>
						</div>
						<div className="col-md-5">
							<div className="form-group">
								<label><b>Course Name: </b>{courseData.course_name} </label>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-5">
							<div className="form-group">
								{!isChecked && isLogged ? (
									<>
										<label><b>Name: </b>{currentProfileData.first_name + " " + currentProfileData.last_name} </label>

									</>
								) : (
									<>
										<input
											type="text"
											className="form-control-input notEmpty"
											id="userName"
											onChange={checkNameHandler}
											required
										/>
										<label className="label-control" htmlFor="userName">
											Name <span style={{ color: "red" }}>*</span>
										</label>
									</>
								)}

							</div>
						</div>
						<div className="col-md-5">

							<div className="form-group">

								{!isChecked && isLogged ? (
									<>
										<label><b>Gender: </b>{currentProfileData.gender} </label>
									</>

								) : (
									<>
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
									</>

								)}

								<p style={errStyle}>{errObj.gender}</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-5">

							<div className="form-group">
								{!isChecked && isLogged ? (


									<>
										<label><b>Date of Birth : </b>{getFormatedDate(currentProfileData.dob)} </label>
									</>

								) : (
									<>
										<input
											ref={ref}
											type="date"
											className="form-control-input notEmpty"
											id="dob"
											onInput={(e) => onProgramChange(e)}
											required

										/>
										<label className="label-control">Date of Birth<span style={{ color: "red" }}>*</span></label>
									</>
								)}

								<p style={errStyle}>{errObj.dob}</p>
							</div>
						</div>
						<div className="col-md-5">
							<div className="form-group">

								<label ><b>Age : </b>{calculatedAge}</label>
								<p style={errStyle}>{errObj.age}</p>
							</div>
						</div>

					</div>

					<div className="row">
						<div className="col-md-5">
							<div className="form-group">
								{courseData.course_name == "T T C" ? (<>

									{!isChecked && isLogged ? (
										<>
											<label><b>Maritial Status: </b>{currentProfileData.maritalstatus} </label>

										</>
									) : (
										<>

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
												<label className="label-control">Marital Status :<span style={{ color: "red" }}>*</span></label>
												<p style={errStyle}>{errObj.maritalstatus}</p>
											</div>

										</>
									)}
								</>) : (<></>)}

							</div>
						</div>
						<div className="col-md-5">
							<div className="form-group">
								{!isChecked && isLogged ? (
									<>

										<label ><b>Email:</b>{user.userData ? user.userData.email_id : ""}</label>
									</>
								) : (
									<>
										<input
											type="text"
											className="form-control-input notEmpty"
											id="user_email"
											onChange={(e) => onProgramChange(e)}
											required

										/>
										<label className="label-control" htmlFor="email">
											Email <span style={{ color: "red" }}>*</span>
										</label>
										<p style={errStyle}>{errObj.user_email}</p>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="form-group">

						<PhoneInput
							international
							className="form-control-input notEmpty"
							value={phoneNumber + ''}
							id="phoneNum"
							onChange={phoneNumberHandler}
						// placeholder="Phone Number" 
						/>

						<label className="label-control">Phone Number<span style={{ color: "red" }}>*</span></label>
						<p style={errStyle}>{errObj.phoneNum}</p>

					</div>
					{isChecked && residentialCourse ? (
						<div className="form-group">
							<select
								className="form-control-input notEmpty"
								id="relationship"
								required
								onChange={relationshipChangeHandler}
							>
								<option value="S_O" key="" selected>
									Select Option
								</option>
								<option value="Parent" key="parent">
									Parent
								</option>
								<option value="Spouse" key="spouse">
									Spouse
								</option>
								<option value="Self" key="self" selected>
									Self
								</option>
								<option value="Child1" key="child1">
									Child 1
								</option>
								<option value="Child2" key="child2">
									Child 2
								</option>
								<option value="Relative" key="relative">
									Relative
								</option>
							</select>
							<label className="label-control">Relationship</label>
						</div>
					) : (
						""
					)}

					<div className="form-group">
						{!residentialCourse ? (
							""
						) : (
							<>
								<select
									className="form-control-input notEmpty"
									id="country"
									onChange={(e) => onProgramChange(e)}
									value={currentProfileData.country}
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

								<div className="form-group">
									<select
										className="form-control-input notEmpty"
										id="state"
										onChange={(e) => onProgramChange(e)}
										value={currentProfileData.state}
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
										value={currentProfileData.city}
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
							</>
						)}

					</div>


					<div className="form-group">
						{isChecked || !isLogged ? (
							<>
								<select
									className="form-control-input notEmpty"
									id="country"
									onChange={(e) => onProgramChange(e)}
									value={program.country}
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
							</>
						) :
							(
								<label><b>Nationality:</b> {currentProfileData.nationality}</label>
							)
						}
					</div>

					{courseData.course_name == 'T T C' ? (<>
						<div className="form-group">
							<select
								className="form-control-input notEmpty"
								id="qualification"
								value={currentProfileData.qualification}
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
								value={currentProfileData.occupation}
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
								value={currentProfileData.languages}
								onChange={(e) => onProgramChange(e)}
								required
							/>
							<label className="label-control">Language<span style={{ color: "red" }}>*</span></label>
							<p style={errStyle}>{errObj.languages}</p>
						</div>
					</>) : (
						<></>
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
									Alternate Phone Number <span style={{ color: "red" }}>*</span>
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
									Emergency Contact Name <span style={{ color: "red" }}>*</span>
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
									Emergency Contact Number <span style={{ color: "red" }}>*</span>
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
									Emergency Contact Relationship <span style={{ color: "red" }}>*</span>
								</label>
								<p style={errStyle}>
									{errObj.emergency_contactrelationship}
								</p>
							</div>
						</div>
					)}
					{!residentialCourse && (
						<div className="form-group">
							<textarea
								className="form-control-input notEmpty"
								id="health_conditions"
								rows="2"
								onChange={(e) => onProgramChange(e)}
							/>
							<label className="label-control">
								Write about your health conditions in detail<span style={{ color: "red" }}>*</span>
							</label>
							<p style={errStyle}>{errObj.health_conditions}</p>
						</div>
					)}
					{courseData.course_name === 'SakhyaM' && (
						<>
							<div className="form-group">
								<select
									className="form-control-input notEmpty"
									id="tobbaco_consumption"
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
								<label className="label-control mb-4">
									Do you currently consume alcohol, tobacco or any other recreational substance? <span style={{ color: "red" }}>*</span>
								</label>
								<p style={errStyle}>{errObj.tobbaco_consumption}</p>
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
									If yes, please list substance and frequency of use <span style={{ color: "red" }}>*</span>:
								</label>
								<p style={errStyle}>{errObj.frequency_details_of_tobaaco_use}</p>
							</div>
						</>
					)}
					
					{residentialCourse && (
						<>
							<h1
								style={{
									fontFamily: "Poppins",
									color: "darkblue",
									fontSize: "20px",
								}}
							>
								Health & Lifestyle
							</h1>
							<div className="row">
								<div className="col-md-5">
									<div className="form-group">
										<Checkbox.Group
											options={healthOptions}
											onChange={handleMultiSelect1}
										/>
									</div>
								</div>
								<div className="col-md-5">
									<div className="form-group">
										<Checkbox.Group
											options={healthOptions2}
											onChange={handleMultiSelect2}
										/>
									</div>
								</div>
							</div>

							

							{noneClicked && (<div className="form-group">
								<textarea
									className="form-control-input notEmpty"
									id="health_conditions"
									rows="2"
									onChange={(e) => onProgramChange(e)}
								/>
								<label className="label-control">
									Describe your health conditions in detail
								</label>
								<p style={errStyle}>{errObj.health_conditions}</p>
							</div>)}
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
									<option value="S_O" key="" selected>
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
								<label className="label-control mb-4">
									Have you used tobacco,alcohol, recreational drugs or
									illicit substances in last 12 months?
								</label>
							</div>
							{frequencyUse && (
								<div className="form-group">
									<textarea
										className="form-control-input notEmpty"
										id="frequency_details_of_tobaaco_use"
										rows="3"
										onChange={(e) => onProgramChange(e)}
									/>
									<label className="label-control">
										Please give details and frequency of use:
									</label>
								</div>)}
						</>
					)}
					{residentialCourse && (
						<>
							<h1
								style={{
									fontFamily: "Poppins",
									color: "darkblue",
									fontSize: "20px",
								}}
							>
								Yoga Experience
							</h1>
							
						</>
					)}
					

					{residentialCourse && (
						<>
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
									Do you have Prior Yoga Experience
								</label>
							</div>
							{prevExperience &&(<div className="form-group">
								<textarea
									className="form-control-input notEmpty"
									id="kind_of_yoga"
									rows="2"
									onChange={(e) => onProgramChange(e)}
								/>
								<label className="label-control">
									Please give details about Yoga and meditation practices
								</label>
							</div>)}
						</>
					)}
					{courseData.course_name === "T T C" && (
						<>

							<div className="form-group">
								<select
									className="form-control-input notEmpty"
									id="planning_to_teach"
									onChange={(e) => onProgramChange(e)}
								>
									<option value="S_O" key="" selected>
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
							{planningToTeachSelected && (<div className="form-group">
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
							</div>)}

							
							{planningToTeachSelected && (<div className="form-group">
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
							</div>)}
						</>
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
					{!residentialCourse && (
						<a style={{ color: "#1890ff" }} onClick={feesHandler}>
							Click Here to read Fee Cancellation/Refund Policy
						</a>
					)}
					{residentialCourse && (
						<a style={{ color: "#1890ff" }} onClick={feesHandler}>
							Click Here to read Fee Cancellation/Refund Policy
						</a>
					)}
					{feesClicked && (
						<div className="form-group mt-2">
							<input
								type="checkbox"
								id="fees"
								onClick={feesAgreementHandler}
							/>
							<label>Yes- I Agree all conditions</label>
						</div>
					)}
					{residentialCourse && (
						<>
							<h3
								style={{
									fontFamily: "Poppins",
									color: "darkblue",
									fontSize: "20px",
								}}
							>
								Ashram Rules & Regulations
							</h3>
							<a style={{ color: "#1890ff" }} onClick={rulesHandler}>
								Click Here to read Ashram Rules & Regulations
								<span style={{ color: "red" }}>*</span>
							</a>
						</>
					)}

					{rulesClicked && (
						<div className="form-group mt-2">
							<input
								type="checkbox"
								id="rules"
								onClick={rulesAgreementHandler}
							/>
							<label>Yes - I Agree conditions</label>
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
						<span style={{ color: "red" }}>*</span>
					</h3>
					<a style={{ color: "#1890ff" }} onClick={termsHandler}>
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

					{courseData.course_name == "T T C" ? (
						<>
							<h3
								style={{
									fontFamily: "Poppins",
									color: "darkblue",
									fontSize: "20px",
								}}
							>
								Declarations
								<span style={{ color: "red" }}>*</span>
							</h3>
							<a style={{ color: "#1890ff" }} onClick={declarationsHandler}>
								Click Here to read Declarations
							</a>
							{termsClicked && (
								<div className="form-group mt-2">
									<input
										type="checkbox"
										id="t&c"
										onClick={declarationsAgreementHandler}
									/>
									<label>
										Yes , I Agree All Conditions
										<span style={{ color: "red" }}>*</span>
									</label>
								</div>
							)}
						</>
					) : ("")}

					<div className="form-group">
						{!isChecked && isLogged ? (
							<>
								{currentProfileData.nationality === "Indian" && (
									<p
										style={{
											fontFamily: "Poppins",
											textAlign: "justify",
											color: "red",
											fontSize: "14px",
											marginTop: "10px",
										}}
									>



										<input type="checkbox" id="" onClick={feeStructureHandler} />
										Fee Structure : I Fully Understand that course fee of INR.{" "}
										{programData.program_fee}  here for Indian Residents
										for course {programData.name}
									</p>
								)}
								{currentProfileData.nationality != "Indian" && (
									<p
										style={{
											fontFamily: "Poppins",
											textAlign: "justify",
											color: "red",
											fontSize: "14px",
											marginTop: "10px",
										}}
									>



										<input type="checkbox" id="" onClick={feeStructureHandler} />
										Fee Structure : I Fully Understand that course fee for Non Indian Residents/International Residents is USD. {programData.program_fee_in_usd}{" "}
										for course {programData.name}
										<span style={{ color: "red" }}>*</span>
									</p>

								)}

							</>
						) : (
							<>
								{program.country === "IN" && (
									<p
										style={{
											fontFamily: "Poppins",
											textAlign: "justify",
											color: "red",
											fontSize: "14px",
											marginTop: "10px",
										}}
									>



										<input type="checkbox" id="" onClick={feeStructureHandler} />
										Fee Structure : I Fully Understand that course fee of INR.{" "}
										{programData.program_fee}  here for Indian Residents
										for course {programData.name}
									</p>
								)}
								{(program.country != "IN") && (
									<p
										style={{
											fontFamily: "Poppins",
											textAlign: "justify",
											color: "red",
											fontSize: "14px",
											marginTop: "10px",
										}}
									>



										<input type="checkbox" id="" onClick={feeStructureHandler} />
										Fee Structure : I Fully Understand that course fee for Non Indian Residents/International Residents is USD. {programData.program_fee_in_usd}{" "}
										for course {programData.name}
										<span style={{ color: "red" }}>*</span>
									</p>

								)}

							</>
						)}




					</div>



					<label>
						<span style={{ color: "red" }}>
							Note: Agreeing to the terms and conditions, fee structures,
							rules and regulation etc is mandatory to submit the
							application
						</span>
					</label>
					{residentialCourse && (
						<>
							{termsAgreed && rulesAgreed && feesAgreed && feeStructure ? (
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
						</>
					)}

					{!residentialCourse && (
						<>
							{termsAgreed && feesAgreed && feeStructure ? (
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
						</>
					)}

				</div>
			</div>

			<div id="myModal" class="modal center" style={{ display: termsDisplay }}>
				<div style={{ marginTop: "-271px" }}>
					{/* <Termsconditions /> */}
					{modalData}
					{/* <Refund fee={programData.program_fee} name={programData.name} /> */}
					<div style={{ textAlign: "center" }}>
						<button
							type="submit"
							className="bt"
							onClick={(e) => globalHandler(e, typeHandler)}
						>
							Okay
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default RegisterProgram;
