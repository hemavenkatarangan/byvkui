import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag,Tooltip } from "antd";
import {
 
  DiffOutlined
} from "@ant-design/icons";
import moment from "moment";

import axios from "axios";
import "../Quill.css";
import ReactQuill from "react-quill";


const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Poppins"];
Quill.register(Font, true);
function UsersQuery() {
	const modules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [moreInfo,setMoreInfo] = useState("");
   const [userData, setUserData] = useState({});
    const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
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
   const requestHandleOk = () => {
	console.log(moreInfo);
	console.log(userData);
	if(!userData.registered_by)
	userData.registered_by=userData.user_email;
	//SEnding mail
	
					var mailObject = {
						to_address: userData.registered_by,
						subject: "Reply to your Query ",
						email_body: moreInfo,
						name: userData.user_name,
						course: "",
						event_start_date:""
					}
					axios
						.post("/mailservice/sendcustommail", mailObject)
						.then((res) => {

							console.log(res);
						});
					//Sending mail
	
	
    setIsRequestModalVisible(false);
  };
   const requestMoreInfoHandler = (e) => {
	//console.log(e);
	setMoreInfo(e);
}
 const requestMoreInfoModal = (data) => {
	setUserData(data);
	setIsRequestModalVisible(true);
}
const requestHandleCancel = () => {
    setIsRequestModalVisible(false);
  };
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
    ,
    {
      title: "Actions",
      key: "action",
      render: (id, data) => (
        <>
          {console.log("Data of user ", data)}
          {
            <>
              
              <Tooltip title="Reply to Queries">
                <Button
                  shape="circle"
                  icon={<DiffOutlined  />}
                  onClick={(e) => requestMoreInfoModal(data)}
                />
              </Tooltip>
            </>
          }
        </>
      ),
    }
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
       <Modal
        title="Request More Info"
        visible={isRequestModalVisible}
        onOk={requestHandleOk}
        onCancel={requestHandleCancel}
      >
        <div className="form-group" style={{ marginBottom: "50px" }}>
          <ReactQuill
            modules={modules}
            style={{ maxHeight: "300px", height: "300px" }}
            theme="snow"
            onChange={requestMoreInfoHandler}
          />
        </div>
      </Modal>
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
