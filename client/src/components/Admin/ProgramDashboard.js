import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FastForwardOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function ProgramDashboard() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [programsData, setProgramsData] = useState([]);
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

    getProgramsData();
  }, []);

  const columns = [
    {
      title: "Programs",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "program_start_date",
      key: "program_start_date",
      render: (data) => getFormatedDate(data),
    },
    {
      title: "End Date",
      dataIndex: "program_end_date",
      key: "program_end_date",
      render: (data) => getFormatedDate(data),
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
        <>
          {data.status === "STARTED" ? null : (
            <>
              <Link to={{ pathname: "/createprogram/" + data._id, data: data }}>
                <EditOutlined title="Edit Program" />
              </Link>{" "}
            </>
          )}

          {
            <>
              <DeleteOutlined
                title="InActivate Program"
                onClick={(e) => deleteProgram(data)}
              />{" "}
              <Link
                to={{ pathname: "/userforprogram/" + data._id, data: data }}
              >
                <EyeOutlined title="View All Users For Program" />{" "}
              </Link>
            </>
          }

          {data.status === "NOT_STARTED" ? (
            <>
              <FastForwardOutlined
                title="Start the program"
                onClick={(e) => startProgram(data)}
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

  const getProgramsData = () => {
    axios
      .get("/programs/")
      .then((res) => {
        setProgramsData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createProgram = () => {
    window.location.href = "../createprogram";
  };

  const editProgram = (data) => {
    // console.log(data);
  };

  const deleteProgram = (data) => {
    axios
      .patch("/programs/" + data._id + "/status/INACTIVE")
      .then((res) => {
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          getProgramsData();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  const startProgram = (data) => {
    axios
      .patch("/programs/" + data._id + "/status/STARTED")
      .then((res) => {
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          getProgramsData();
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
                Programs Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="ex-basic-1 pt-4" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <div style={{ float: "right" }} className="row">
                <Button
                  style={{ backgroundColor: "#ffdb58", fontWeight: "bold" }}
                  shape="round"
                  size="large"
                  onClick={(e) => createProgram()}
                >
                  Create Program
                </Button>
              </div>
              <Table width="100%" columns={columns} dataSource={programsData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramDashboard;
