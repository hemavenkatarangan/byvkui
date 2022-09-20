import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authActions";
import StrengthMeter from "./StrengthMeter";
const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function Register(props) {
  const [user, setUser] = useState({
    email_id: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    phone_num: "",
    // userRole:'CUSTOMER'
  });
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
   const [poorPassword, setPoorPassword] = useState(false);
    const [weakPassword, setWeakPassword] = useState(false);
    const [strongPassword, setStrongPassword] = useState(false);
    const [passwordError, setPasswordErr] = useState("");
    
     const passwordStrength=(evnt)=>{
    const passwordValue= evnt.target.value;
    const passwordLength= passwordValue.length;
    const poorRegExp = /[a-z]/;
    const weakRegExp = /(?=.*?[0-9])/;;
    const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
    const whitespaceRegExp = /^$|\s+/;
    const poorPassword= poorRegExp.test(passwordValue);
    const weakPassword= weakRegExp.test(passwordValue);
    const strongPassword= strongRegExp.test(passwordValue);
    const whiteSpace= whitespaceRegExp.test(passwordValue);
   
    if(passwordValue===''){
        setPasswordErr("Password is Empty");
    }else{
        
        // to check whitespace
        if(whiteSpace){
            setPasswordErr("Whitespaces are not allowed");
        }
        // to check poor password
        if(passwordLength <= 3 && (poorPassword || weakPassword || strongPassword))
        {
        setPoorPassword(true);
        setPasswordErr("Password is Poor");
        }
        // to check weak password
        if(passwordLength>= 4 && poorPassword && (weakPassword || strongPassword))
        {
            setWeakPassword(true);
            setPasswordErr("Password is Weak");
        }else{
        setWeakPassword(false); 
        }
        // to check strong Password
        if(passwordLength >= 6 && (poorPassword && weakPassword) && strongPassword)
        {
            setStrongPassword(true);
            setPasswordErr("Password is Strong");
        }else{
           setStrongPassword(false);  
        }
    }
}
  const handleChage = (e) => {
    const { id, value } = e.target;
    setUser((user) => ({ ...user, [id]: value }));
  };

  const submitForm = () => {
    dispatch(registerUser(user, props.history));
  };

  return (
    <div>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-10 offset-xl-1"
              style={{ fontFamily: "Poppins" }}
            >
              <h1 className="text-center">Sign Up</h1>
              <p style={{ fontFamily: "Poppins" }}>
                To stay up to date with BYVK’s latest and programs and
                information please sign up to receive our communications.
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="ex-form-1 pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3">
              <div className="text-box mt-5 mb-5">
                <p className="mb-4" style={{ fontFamily: "Poppins" }}>
                  Fill out the form below to sign up for the service. Already
                  signed up? Then just{" "}
                  <a className="blue" href="/login">
                    Log In
                  </a>
                </p>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    id="first_name"
                    onChange={(e) => handleChage(e)}
                    required
                  />
                  <label className="label-control" htmlFor="first_name">
                    First Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <p style={errStyle}>{errors.first_name}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control-input notEmpty"
                    id="last_name"
                    onChange={(e) => handleChage(e)}
                    required
                  />
                  <label className="label-control" htmlFor="last_name">
                    Last Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <p style={errStyle}>{errors.last_name}</p>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control-input notEmpty"
                    id="email_id"
                    onChange={(e) => handleChage(e)}
                    required
                  />
                  <label className="label-control" htmlFor="email_id">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <p style={errStyle}>{errors.email_id}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control-input notEmpty"
                    id="password"
                    onInput={passwordStrength}
                    onChange={(e) => handleChage(e)}
                    required
                  />
                  <label className="label-control" htmlFor="password">
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <StrengthMeter poorPassword={poorPassword} weakPassword={weakPassword} strongPassword={strongPassword} passwordError={passwordError} />
                  <p style={errStyle}>{errors.password}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control-input notEmpty"
                    id="confirm_password"
                    onChange={(e) => handleChage(e)}
                    required
                  />
                  <label className="label-control" htmlFor="confirm_password">
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <p style={errStyle}>{errors.confirm_password}</p>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control-input notEmpty"
                    id="phone_num"
                    onChange={(e) => handleChage(e)}
                  />
                  <label className="label-control" htmlFor="phone_num">
                    Mobile
                  </label>
                  <p style={errStyle}>{errors.phone_num}</p>
                </div>
                <div
                  className="form-group checkbox"
                  style={{ fontFamily: "Poppins", textAlign: "center" }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    value="Agreed-to-Terms"
                    required
                  />
                  Would you like you receive emails from BYVK?
                  <h5
                    style={{
                      fontFamily: "Poppins",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    Disclaimer
                  </h5>
                  <p style={{ fontFamily: "Poppins", textAlign: "justify" }}>
                    <i>
                      BYVK will keep your personal information private and
                      secure. By submitting the above information you are
                      agreeing to BYVK keeping you informed about our programs,
                      and agreeing that we can share it with third party vendors
                      required to send you our communications.
                    </i>
                  </p>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control-submit-button"
                    onClick={(e) => submitForm(e)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
