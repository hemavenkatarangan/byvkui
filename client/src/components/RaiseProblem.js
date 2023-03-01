import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Quill.css";
import ReactQuill from "react-quill";


const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Poppins"];
Quill.register(Font, true);
const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function RaiseProblem() {
  const [problem, setProblem] = useState({
    name: "",
    email: "",
    problemstatement: "",
    problemdescription: "",
    status:"RAISED"
  });
  const [errObj, setErrObj] = useState({
    name: "",
    email: "",
    problemstatement: "",
    problemdescription: "",
    status:""
  });
   const [problemDescription,setProblemDescription] = useState("");
 const problemdescriptionHandler = (e) => {
	//console.log(e);
	setProblemDescription(e);
}
  const handleChage = (e) => {
    const { id, value } = e.target;
    setProblem((problem) => ({ ...problem, [id]: value }));
  };
 const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const validateForm = () => {
    let proceed = true;
    const emailRegex = /\S+@\S+\.\S+/;

    if (problem.name.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        name: "Name should be mandatory",
      }));
    }
    else
    {
	setErrObj((errObj) => ({
        ...errObj,
        name: "",
      }));
    }

   if (problem.problemstatement.length < 1) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        problemstatement: "Problem Statement is  mandatory",
      }));
    }
    else
    {
	setErrObj((errObj) => ({
        ...errObj,
        problemstatement: "",
      }));
}
problem.problemdescription=problemDescription;
if (problemDescription.length < 1) {
	
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        problemdescription: "Problem Description is  mandatory",
      }));
    }
else
{
	 setErrObj((errObj) => ({
        ...errObj,
        problemdescription: "",
      }));
}
    if (problem.email.length < 1 || !emailRegex.test(problem.email)) {
      proceed = false;
      setErrObj((errObj) => ({
        ...errObj,
        email: "Email should be mandatory",
      }));
    }
    else
    {
	setErrObj((errObj) => ({
        ...errObj,
        email: "",
      }));
}

    

  
    problem.status="RAISED"
    console.log(problem)
    console.log(proceed);
    if (proceed) {
      submitForm();
      setErrObj((errObj) => ({
        ...errObj,
    name: "",
    email: "",
    problemstatement: "",
    problemdescription: "",
    status:""
      }));
    }
  };

  const submitForm = () => {
	console.log(problem)
    axios
      .post("/problem", problem)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire(
            "YAAY..!",
            "Your Problem was successfully submitted, Our Team will look into the problem soon ",
            "success"
          ).then(function () {
            window.location.href = "/";
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="ex-basic-1 pt-4">
        <div className="container">
         
            <div className="text-container" style={{ marginTop: "100px" }}>
              <h3
                className="h3-large"
                style={{
                  fontFamily: "Poppins",
                  color: "darkblue",
                  fontSize: "32px",
                }}
              >
                Raise Problem
              </h3>
             
              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                {/* <a href="https://forms.gle/rRUATBuuCsy5o8Dn9" style={{color:'darkblue',fontSize:'16px'}}> https://forms.gle/rRUATBuuCsy5o8Dn9</a> */}
              </p>
              
                      {/* <p className="mb-4" style={{ fontFamily: 'Poppins'}}>Fill out the form below to sign up for the service. Already signed up? Then just <a className="blue" href="/login">Log In</a></p> */}
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control-input notEmpty"
                          id="name"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="name">
                          Name
                        </label>
                        <p style={errStyle}>{errObj.name}</p>
                      </div>
                       <div className="form-group">
                        <input
                          type="email"
                          className="form-control-input notEmpty"
                          id="email"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="email">
                          Email
                        </label>
                        <p style={errStyle}>{errObj.email}</p>
                      </div>
                      <div className="form-group">
                        <textarea
                          type="textarea"
                          className="form-control-input notEmpty"
                          id="problemstatement"
                          onChange={(e) => handleChage(e)}
                          required
                        />
                        <label className="label-control" htmlFor="problemstatement">
                          Problem Statement
                        </label>
                        <p style={errStyle}>{errObj.problemstatement}</p>
                      </div>
                     <div className="form-group" style={{ marginBottom: "50px" }}>
	         		 <ReactQuill
	           		 modules={modules}
	           		 style={{ maxHeight: "300px", height: "300px" }}
	           		 theme="snow"
	           		 onChange={problemdescriptionHandler}
	         		 />
       			 	</div>
                      
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control-submit-button"
                          onClick={(e) => validateForm(e)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
             
             
            
    </>
  );
}

export default RaiseProblem;
