import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag, Tooltip, Image } from "antd";
import { CheckOutlined, StopOutlined, EyeOutlined } from "@ant-design/icons";
import { openNotificationWithIcon } from "../Notifications";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function UserRegistertedForProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [programsData, setProgramsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userImageData, setUserImageData] = useState([]);
  const [getUserInfo, setUserInfo] = useState(String);
  useEffect(() => {
    if (user.userData.roles[0] !== "ADMIN") {
      window.location.href = "/home";
      return;
    }

    // console.log(user);

    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    getAllUsersData();
  }, []);

  const getAllUsersData = () => {
    axios
      .get("/users/")
      .then((res) => {
        setUsersData(res.data.user);
        getUserRegisteredData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCountryAndStateValue = (type, val) => {
    if (type === "country") {
      let name = City.getCountryByCode(val.country);
      // console.log(name);
    } else {
      let name = State.getStateByCodeAndCountry(val.country, val.state);
      // console.log(name);
    }
  };

  const getUserDetails = (type, data) => {
    var name;

    for (let i = 0; i < usersData.length; i++) {
      //console.log(usersData[i]);
      if (data.user_id === usersData[i]._id) {
        if (type === "NAME") {
          name = usersData[i].first_name + " " + usersData[i].last_name;
          setUserInfo(name);
        } else if (type === "EMAIL") {
          name = usersData[i].email_id;
          setUserInfo(name);
        }
        console.log("Found " + name);
        return getUserInfo;
      }
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
    },
    {
      title: "Address",
      dataIndex: "address_1",
      key: "address_1",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      // render: (id, data) => {
      //   getCountryAndStateValue("state", data);
      // },
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      // render: (id, data) => {
      //   getCountryAndStateValue("country", data);
      // },
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
                  icon={<ReadOutlined />}
                  onClick={(e) => openUserDocuments(data)}
                />
              </Tooltip>
              <Tooltip title="User Details">
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
        console.log(res.data.result, "alldata");
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
        // console.log(res);
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
              <Table
                width="100%"
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={programsData}
              />
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
          console.log("File extension " + data.document_path.split(".")[1]);
          return (
            <div
              className="row"
              style={{ marginBottom: "20px", border: "1px solid black" }}
              key={index}
            >
              <div className="col">{data.document_type}</div>
              <div className="col">
                {data.document_path.includes(".pdf") ||
                data.document_path.includes(".zip") ? (
                  <a href={data.document_path} target="_blank">
                    click here to download
                  </a>
                ) : (
                  <Image width={150} height={150} src={data.document_path} />
                )}
              </div>
            </div>
          );
        })}
      </Modal>
    </>
  );
}

export default UserRegistertedForProgram;
