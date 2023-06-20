import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Tag } from "antd";
import {
  CloseSquareOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

const UserRoleManagement = () => {

  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    //console.log(user.userData.roles[0], "roles");
    if (user.userData.roles[0] !== "ADMIN") {
      window.location.href = "/home";
      return;
    }
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "User Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Email ID",
      dataIndex: "email_id",
      key: "email_id",
    },
    {
      title: "User Role",
      dataIndex: "roles",
      key: "roles",
    },

    {
      title: "Admin",
      key: "adminrole",
      render: (id, data) => (
        <>
          <>
            {
                (data.roles[0] === "ADMIN")?
                    <CheckOutlined
                        title="Remove Admin Role"
                        onClick={() => changeRole("USER",data)}
                    />:
                    <CloseSquareOutlined
                        title="Assign Admin Role"
                        onClick={() => changeRole("ADMIN",data)}
                    />
            }


          </>
        </>
      ),
    },
    {
      title: "Super Admin",
      key: "superadminrole",
      render: (id, data) => (
          <>
            <>
              {
                (data.roles[0] === "SUPER_ADMIN")?
                    <CheckOutlined
                        title="Remove Super Admin Role"
                        onClick={() => changeRole("USER",data)}
                    />:
                    <CloseSquareOutlined
                        title="Assign Super Admin Role"
                        onClick={() => changeRole("SUPER_ADMIN",data)}
                    />
              }


            </>
          </>
      ),
    },
    {
      title: "Kendra Admin",
      key: "kendraadminrole",
      render: (id, data) => (
          <>
            <>
              {
                (data.roles[0] === "KENDRA_ADMIN")?
                    <CheckOutlined
                        title="Remove Kendra Admin Role"
                        onClick={() => changeRole("USER",data)}
                    />:
                    <CloseSquareOutlined
                        title="Assign Kendra Admin Role"
                        onClick={() => changeRole("KENDRA_ADMIN",data)}
                    />
              }


            </>
          </>
      ),
    }
  ];

  const getAllUsers = () => {
    axios
      .get("/users/")
      .then((res) => {
        console.log(res.data.user, "get");
        setUserData(res.data.user.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeRole = (role,data) => {
    console.log(data);
    data.roles[0]=role;
    var id = data._id;
    axios
        .patch("/users/" + id, data)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    console.log("Edit Kendra");

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
                UserRole Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="ex-basic-1 pt-4" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
               <Table width="100%" columns={columns} dataSource={userData} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UserRoleManagement;
