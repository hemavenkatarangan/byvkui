import { Button, Select, Input, Upload, message } from "antd";
import axios from "axios";
import { useState, useEffect, useSelector } from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const { TextArea } = Input;

const questionTypes = [
  { type: "Descriptive", name: "Descriptive" },
  { type: "Selective", name: "Selective" },
  { type: "Multiple Choice", name: "Multiple Choice" },
  { type: "text", name: "Text" },
];

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function Qa(props) {
  const [questions, setQuestions] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [addOnProp, setAddOnProp] = useState([]);
  // const errors = useSelector(state => state.errors)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses/${props.match.params.id}/complete`)
      .then((res) => {
        console.log(res.data);
        setCourseName(res.data.name);
        setQuestions(res.data.qa);
        setAddOnProp(res.data.additionalProperties);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChage = (e, type) => {
    if (type === questionTypes[1].type) {
      // console.log(e)
    } else if (type === questionTypes[2].type) {
      // console.log(e)
    } else {
      // console.log(e)
    }
    // console.log(e, type)
  };

  const submitForm = (obj) => {
    console.log(obj);
  };

  const uploadData = {
    action: "http://localhost:3001/courses/613dcc600e2c2a43cc7e13c4/questions",
    listType: "picture",
    previewFile(file) {
      console.log("Your upload file:", file);
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };

  return (
    <>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <br />
            <div className="col-xl-12" style={{ textAlign: "center" }}>
              <h1>{courseName} Form</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div style={{ margin: "0 auto", alignItems: "center" }}>
          {questions.map((data, index) => {
            if (data.questionType === questionTypes[0].type) {
              return (
                <div className="form-group" key={index}>
                  <TextArea
                    style={{ width: "60%" }}
                    placeholder={data.question}
                    id="name"
                    onChange={(e) => handleChage(e, questionTypes[0].type)}
                  />
                </div>
              );
            } else if (data.questionType === questionTypes[2].type) {
              return (
                <div className="form-group" key={index}>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "60%" }}
                    placeholder={`Please select ${data.question}`}
                    onChange={(e) => handleChage(e, questionTypes[2].type)}
                  >
                    {data.preDefinedValues.map((each, index) => {
                      return <Option key={each}>{each}</Option>;
                    })}
                  </Select>
                </div>
              );
            } else if (data.questionType === questionTypes[1].type) {
              return (
                <div className="form-group" key={index}>
                  <Select
                    allowClear
                    style={{ width: "60%" }}
                    placeholder={`Please select ${data.question}`}
                    onChange={(e) => handleChage(e, questionTypes[2].type)}
                  >
                    {data.preDefinedValues.map((each, index) => {
                      return (
                        <option value={each} key={index}>
                          {each}
                        </option>
                      );
                    })}
                  </Select>
                </div>
              );
            }
          })}
          {addOnProp.map((data, index) => {
            if (data.type === questionTypes[3].type) {
              return (
                <div className="form-group" key={index}>
                  <TextArea
                    style={{ width: "60%" }}
                    placeholder={data.name}
                    id="name"
                    onChange={(e) => handleChage(e, questionTypes[0].type)}
                  />
                </div>
              );
            } else {
              return (
                <div className="form-group" key={index}>
                  <Upload {...uploadData}>
                    <Button icon={<UploadOutlined />}>
                      Upload {data.name}
                    </Button>
                  </Upload>
                </div>
              );
            }
          })}
          <div style={{ textAlign: "center" }}>
            <Button type="primary" size="large" onClick={(e) => submitForm(e)}>
              Submit Form
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Qa;
