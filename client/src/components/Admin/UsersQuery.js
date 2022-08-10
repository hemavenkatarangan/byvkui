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

function UsersQuery() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [queryData, setQueryData] = useState([]);
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

    getQueryData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Query",
      dataIndex: "query",
      key: "query",
    },
    {
      title: "Mobile",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Asked Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => getFormatedDate(data),
    },
  ];

  const getFormatedDate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };

  const getQueryData = () => {
    axios
      .get("/contact")
      .then((res) => {
        setQueryData(res.data);
      })
      .catch((err) => {
        console.log(err);
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
                User Questions
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="ex-basic-1 pt-4" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <Table width="100%" columns={columns} dataSource={queryData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersQuery;
