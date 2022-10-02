import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import fileUploadUrl from "../constants/constants";

function UserDashboard() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [programsData, setProgramsData] = useState([]);
  useEffect(() => {
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    getProgramsData();
  }, []);

  const columns = [
    {
      title: "User name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "email",
      dataIndex: "email_id",
      key: "email_id",
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "STATUS",
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
        <>
          {/* {data.status === "NOT_STARTED" ? ( */}
          <>
            {/* <CloudUploadOutlined
              title="Upload File"
              onClick={(e) => uploadPaymentFile(data)}
            > */}
            <input
              type="file"
              onChange={(e) => uploadPaymentFile(e, id)}
            ></input>
            {/* </CloudUploadOutlined>{" "} */}
          </>
          {/* ) : null} */}
        </>
      ),
    },
  ];

  //   const openUserDocuments = (data) => {
  //     setIsDocumentModalVisible(true);
  //     axios
  //       .get(`/userdocuments/program/${data.program_id}/user/${data.user_id}`)
  //       .then((res) => {
  //         // console.log(res);
  //         setProgramsData(res.data.result);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const getProgramsData = () => {
    axios
      .get("/payments/")
      .then((res) => {
        setProgramsData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadPaymentFile = (e, id) => {
    console.log(id);
    if (
      e.target.files[0].type === "application/pdf" ||
      e.target.files[0].type === "application/x-zip-compressed" ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      var form = new FormData();
      form.append("course_name", id.program_id);
      // for (let i = 0; i < e.target.files.length; i++) {
      form.append("files", e.target.files[0]);
      // }

      axios
        .post(fileUploadUrl, form)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(`Sorry the format which you selected is not supported.`);
    }
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
                Events Dashboard
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

export default UserDashboard;
