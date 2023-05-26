import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FastForwardOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

const KendraManagement = () => {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [kendraData, setKendraData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [kendra, setKendra] = useState({
    name: "",
    address: "",
    gps: "",
  });
  const [errObj, setErrObj] = useState({
    name: "",
    address: "",
    gps: "",
  });

  useEffect(() => {
    console.log(user.userData.roles[0], "roles");
    if (user.userData.roles[0] !== "ADMIN") {
      window.location.href = "/home";
      return;
    }

    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    getKendraData();
  }, []);

  const columns = [
    {
      title: "Kendra Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kendra Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kendra GPS",
      dataIndex: "gps",
      key: "gps",
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
        <>
          <>
            <EditOutlined
              title="Edit the Kendra Detail"
              onClick={(e) => editKendra(data)}
            />
            <DeleteOutlined onClick={(e) => deleteKendra(data)} />
          </>
        </>
      ),
    },
  ];

  const getKendraData = () => {
    axios
      .get("/problem/")
      .then((res) => {
        setKendraData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editKendra = (data) => {
    console.log(data);
    console.log("Edit Kendra");
    axios
      .patch("/problem/" + data._id + "/status/CLOSED")
      .then((res) => {
        if (res.data.status_code === "200") {
          alert(res.data.status_message);
          getKendraData();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  const deleteKendra = (data) => {
    // console.log(data)
    axios
      .delete("/courses/" + data._id)
      .then((res) => {
        // console.log(res)
        setKendraData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addKendraData = () => {
    setIsModalVisible(true);
  };

  const submitKendraData = () => {
    console.log("hello");
    //     // validations here
    //     let valid = true;
    //     if (kendra.name.length <= 2) {
    //       valid = false;
    //       setErrObj((errObj) => ({
    //         ...errObj,
    //         name: "Kendra name should be minimum 3 letters",
    //       }));
    //     }
    //     if (kendra.address.length <= 3) {
    //       valid = false;
    //       setErrObj((errObj) => ({
    //         ...errObj,
    //         address: "Enter a valid Address",
    //       }));
    //     }
    //      console.log(valid,"valid");
    //     if (valid) {
    //       submit();
    //     }
  };

  const submit = () => {
    var obj = kendra;
    var obj = {
      name: kendra.name,
      address: kendra.address,
      gps: kendra.gps,
    };
    // if (boolVal) {
    //   axios
    //     .patch("/courses/" + course.course_id, obj)
    //     .then((res) => {
    //       // console.log(res)
    //       setIsModalVisible(false);
    //       setKendraDataAsNull();
    //       getCoursesData();
    //       setBoolVal(false);
    //       alert(res.data.status_message);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    axios
      .post("/courses/", obj)
      .then((res) => {
        // console.log(res)
        setIsModalVisible(false);
        setKendraDataAsNull();
        getKendraData();
        //setBoolVal(false);
        alert(res.data.status_message);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  const setKendraDataAsNull = () => {
    setKendra((kendra) => ({
      ...kendra,
      name: "",
      address: "",
      gps: "",
    }));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onKendraChange = (e) => {
    const { id, value } = e.target;
    setKendra((kendra) => ({ ...kendra, [id]: value }));
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
                Kendra Dashboard
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
                  onClick={(e) => addKendraData()}
                >
                  Add Kendra
                </Button>
              </div>

              <Table width="100%" columns={columns} dataSource={kendraData} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Kendra Details"
        width="75%"
        visible={isModalVisible}
        onOk={(e) => submitKendraData(e)}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control-input notEmpty"
            value={kendra.name}
            id="name"
            onChange={(e) => onKendraChange(e)}
            required
          />
          <label className="label-control" htmlFor="name">
            Name
          </label>
          <p style={errStyle}>{errObj.name}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control-input notEmpty"
            value={kendra.gps}
            id="gps"
            onChange={(e) => onKendraChange(e)}
          />
          <label className="label-control" htmlFor="gps">
            GPS
          </label>
          <p style={errStyle}>{errObj.gps}</p>
        </div>
        <div className="form-group">
          <input
            type="textarea"
            className="form-control-input notEmpty"
            value={kendra.address}
            id="address"
            onChange={(e) => onKendraChange(e)}
            required
          />
          <label className="label-control" htmlFor="address">
            Address
          </label>
          <p style={errStyle}>{errObj.address}</p>
        </div>
      </Modal>
    </>
  );
};

export default KendraManagement;
