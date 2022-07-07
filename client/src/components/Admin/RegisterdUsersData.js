import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function UserRegistertedForProgram(props) {
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

    getUserRegisteredData();
  }, []);

  const columns = [
    {
      title: "Address",
      dataIndex: "address_1",
      key: "address_1",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Start Date",
      dataIndex: "program_start_date",
      key: "program_start_date",
      render: (data) => getFormatedDate(data),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const getFormatedDate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };

  const getUserRegisteredData = () => {
    axios
      .get("/usermanagement/program/" + props.match.params.id)
      .then((res) => {
        console.log(res);
        setProgramsData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const editProgram = (data) => {
  //     console.log(data);
  //   };

  //   const deleteProgram = (data) => {
  //     axios
  //       .delete("/programs/" + data._id)
  //       .then((res) => {
  //         if (res.data.status_code === "200") {
  //           alert(res.data.status_message);
  //           getUserRegisteredData();
  //         } else {
  //           alert(res.data.error);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error" + err);
  //       });
  //   };

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
                Registered Users Data
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="ex-basic-1 pt-4" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <Table width="100%" columns={columns} dataSource={programsData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegistertedForProgram;
