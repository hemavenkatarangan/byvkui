import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag, Tooltip, Image } from "antd";
import { CheckOutlined, StopOutlined, EyeOutlined } from "@ant-design/icons";
import { openNotificationWithIcon } from "../Notifications";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function UserRegistertedForProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [programsData, setProgramsData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userImageData, setUserImageData] = useState([]);
  useEffect(() => {
    if (user.userData.roles[0] !== "ADMIN") {
      window.location.href = "/home";
      return;
    }

    console.log(user);

    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    getUserRegisteredData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => user.userData.first_name,
    },

    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (data) => user.userData.email_id,
    },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (id, data) => {
        let c =
          data.status === "APPROVED"
            ? "green"
            : data.status === "REJECTED"
            ? "red"
            : "orange";
        return <Tag color={c}>{data.status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (id, data) => (
        <>
          {
            <>
              {data.status === "REGISTERED" ? (
                <>
                  <Tooltip title="Approve">
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      onClick={(e) => approveORrejectUser(data, "APPROVED")}
                    />
                  </Tooltip>{" "}
                  <Tooltip title="Reject">
                    <Button
                      shape="circle"
                      icon={<StopOutlined />}
                      onClick={(e) => approveORrejectUser(data, "REJECTED")}
                    />
                  </Tooltip>{" "}
                </>
              ) : data.status === "REJECTED" || data.status === "REGISTERED" ? (
                <Tooltip title="Approve">
                  <Button
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={(e) => approveORrejectUser(data, "APPROVED")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Reject">
                  <Button
                    shape="circle"
                    icon={<StopOutlined />}
                    onClick={(e) => approveORrejectUser(data, "REJECTED")}
                  />
                </Tooltip>
              )}{" "}
              <Tooltip title="View Documents">
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={(e) => openUserDocuments(data)}
                />
              </Tooltip>
            </>
          }
        </>
      ),
    },
  ];

  const approveORrejectUser = (data, status) => {
    let obj = {
      status: status,
    };
    axios
      .patch("/usermanagement/status/" + data._id, obj)
      .then((res) => {
        if (res.data.status_code === "200") {
          openNotificationWithIcon({
            type: "success",
            msg: "User Status",
            description: res.data.status_message,
          });
          getUserRegisteredData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const openUserDocuments = (data) => {
    setIsModalVisible(true);
    axios
      .get(`/userdocuments/program/${data.program_id}/user/${data.user_id}`)
      .then((res) => {
        console.log(res);
        setUserImageData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Modal
        title="User Documents"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {userImageData.map((data, index) => {
          return (
            <div
              className="row"
              style={{ marginBottom: "20px", border: "1px solid black" }}
              key={index}
            >
              <div className="col">{data.document_type}</div>
              <div className="col">
                <Image width={150} height={150} src={data.document_path} />
              </div>
            </div>
          );
        })}
      </Modal>
    </>
  );
}

export default UserRegistertedForProgram;
