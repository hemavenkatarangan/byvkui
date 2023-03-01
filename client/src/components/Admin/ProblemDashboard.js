import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  Table } from "antd";
import {
  EditOutlined,
 
} from "@ant-design/icons";
import moment from "moment";
import parse from 'html-react-parser'
import axios from "axios";


function ProblemDashboard() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [problemData, setProblemData] = useState([]);
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

    getProblemData();
  }, []);




  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Problem Statement",
      dataIndex: "problemstatement",
      key: "problemstatement",
      
    },
    {
      title: "Problem Description",
      dataIndex: "problemdescription",
      key: "problemdescription",
      render : (data) => parse (data),
      
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => getFormatedDate(data),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
     
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
        <>
          
          {(data.status === "RAISED" )? (
            <>
              <EditOutlined
                title="Close the Problem"
                onClick={(e) => closeProblem(data)}
              />{" "}
            </>
          ) : null}
        </>
      ),
    },
  ];

  const getFormatedDate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };

  const getProblemData = () => {
    axios
      .get("/problem/")
      .then((res) => {
        setProblemData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };



 

  const closeProblem = (data) => {
	console.log(data)
	console.log("Close problem");
    axios
      .patch("/problem/" + data._id + "/status/CLOSED")
      .then((res) => {
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          getProblemData();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log("Error" + err);
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
                Problem Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
     <div className="ex-basic-1 pt-4" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              
              <Table width="100%" columns={columns} dataSource={problemData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProblemDashboard;
