import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table,  Tag, Tooltip, Image  } from "antd";
import {
  CheckOutlined,
  StopOutlined,
  EyeOutlined,
  ReadOutlined,
  MoneyCollectOutlined,
  DiffOutlined,
  ArrowUpOutlined
} from "@ant-design/icons";
import { openNotificationWithIcon } from "../Notifications";
import axios from "axios";
import moment from "moment";
import "../Quill.css";
import ReactQuill from "react-quill";
import {ExportExcel} from './ExportExcel'


const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Poppins"];
Quill.register(Font, true);

function UserRegistertedForProgram(props) {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [programsData, setProgramsData] = useState([]);
  const [programInfo, setProgramInfo] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
      const [isRejectReasonModalVisible, setIsRejectReasonModalVisible] = useState(false);
  const [userImageData, setUserImageData] = useState([]);
   const [paymentImageData, setPaymentImageData] = useState([]);
   const [moreInfo,setMoreInfo] = useState("");
  const [rejectReason,setRejectReason] = useState("");
  const fileName = "myfile";
  const [userData, setUserData] = useState({});
  useEffect(() => {
   
    if (user.isAuthenticated) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    getAllUsersData();
    getProgramInfo();
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

 
  const getProgramInfo = () => {
    axios
      .get("/programs/" + props.match.params.id)
      .then((res) => {
        console.log(res.data.result, "Program info");
        setProgramInfo(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
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
      title: "Country",
      dataIndex: "country",
      key: "country",
     
    },
    {
      title: "Date of Submission",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => getFormatedDate(data),
     
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
        
          {console.log("Data of user ", data)}
           {console.log("user info ", user)}
          {
            <>
              {data.status === "REGISTERED"  || programInfo.name.toLowerCase().includes('t t c')? (
                <>
                {user.userData.roles[0] === "ADMIN" ? (
                  <Tooltip title="Approve">
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      onClick={(e) => changeStatus(data, "APPROVED")}
                    />
                  </Tooltip>
                  ):""}
                   {user.userData.roles[0] === "SUPER_ADMIN" ? (
                  <Tooltip title="Approve as Medically Fit">
                    <Button
                      shape="circle"
                      icon={<CheckOutlined />}
                      onClick={(e) => changeStatus(data, "MEDICALLY_FIT")}
                    />
                  </Tooltip>
                  ):""}
                  <Tooltip title="Reject">
                    <Button
                      shape="circle"
                      icon={<StopOutlined />}
                      onClick={(e) => changeStatus(data, "REJECTED")}
                    />
                  </Tooltip>{" "}
                </>
              ) : data.status === "REJECTED" || data.status === "REGISTERED" ? (
                <Tooltip title="Approve">
                  <Button
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={(e) => changeStatus(data, "APPROVED")}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Reject">
                  <Button
                    shape="circle"
                    icon={<StopOutlined />}
                    onClick={(e) => rejectReasonModal(data, "REJECTED")}
                  />
                </Tooltip>
              )}{" "}
              <Tooltip title="View Documents">
                <Button
                  shape="circle"
                  icon={<ReadOutlined />}
                  onClick={(e) => openUserDocuments(data)}
                />
              </Tooltip>{" "}
              <Tooltip title="User Details">
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={(e) => openUserData(data)}
                />
              </Tooltip>{" "}
              <Tooltip title="Payment Details">
                <Button
                  shape="circle"
                  icon={<MoneyCollectOutlined  />}
                  onClick={(e) => openPaymentData(data)}
                />
              </Tooltip>{" "}
              <Tooltip title="Request More Info">
                <Button
                  shape="circle"
                  icon={<DiffOutlined  />}
                  onClick={(e) => requestMoreInfoModal(data)}
                />
              </Tooltip>{" "}
             {user.userData.roles[0] === "ADMIN" ? ( 
              <Tooltip title="Refer to Super Admin">
                <Button
                  shape="circle"
                  icon={<ArrowUpOutlined  />}
                 onClick={(e) => changeStatus(data, "REFER_TO_SUPERADMIN")}
                />
              </Tooltip>
              ):""}
            </>
          }
        </>
      ),
    },
  ];

  const changeStatus = (data, status) => {
	
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
          
          if(status === "APPROVED")
          {
          
          //SEnding mail
					var mailObject = {
						to_address: data.user_email,
						subject: "Congratulation Your Application for "+programInfo.name + " is Approved",
						email_body: "",
						name: data.user_name,
						course: programInfo.name,
						event_start_date:getFormatedDate(programInfo.program_start_date)
					}
					axios
						.post("/mailservice/sendmailforapproval", mailObject)
						.then((res) => {

							console.log(res);
						});
					//Sending mail
          }
         
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
    setIsDocumentModalVisible(true);
    axios
      .get(`/userdocuments/program/${data.program_id}/user/${data.user_id}`)
      .then((res) => {
        
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

  const handleDocumentModalOk = () => {
    setIsDocumentModalVisible(false);
  };

  const handleDocumentModalCancel = () => {
    setIsDocumentModalVisible(false);
  };
 const handlePaymentModalOk = () => {
    setIsPaymentModalVisible(false);
  };

  const handlePaymentModalCancel = () => {
    setIsPaymentModalVisible(false);
  };
  const openUserData = (data) => {
    setIsModalVisible(true);
    console.log(data);
    setUserData(data);
  };
  
    const requestHandleOk = () => {
	console.log(moreInfo);
	console.log(userData);
	if(!userData.registered_by)
	userData.registered_by=userData.user_email;
	//SEnding mail
	
					var mailObject = {
						to_address: userData.registered_by,
						subject: "Request for more Information ",
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
  
    const rejectHandleOk = () => {
	console.log(rejectReason);
	console.log(userData);
	
	 let obj = {
      status: "REJECTED",
    };
    axios
      .patch("/usermanagement/status/" + userData._id, obj)
      .then((res) => {
        if (res.data.status_code === "200") {
          openNotificationWithIcon({
            type: "success",
            msg: "User Status",
            description: res.data.status_message,
          });
          }});
          
	if(!userData.registered_by)
	userData.registered_by=userData.user_email;
	//SEnding mail
	
	//SEnding mail
					var mailObject = {
						to_address: userData.user_email,
						subject: "Your Application for "+programInfo.name + " is Rejected ",
						email_body: rejectReason,
						name: userData.user_name,
						course: programInfo.name,
						event_start_date:getFormatedDate(programInfo.program_start_date)
					}
					axios
						.post("/mailservice/sendmailforreject", mailObject)
						.then((res) => {

							console.log(res);
						});
					
	
	
    setIsRejectReasonModalVisible(false);
  };

  const requestHandleCancel = () => {
    setIsRequestModalVisible(false);
  };
   const rejectHandleCancel = () => {
    setIsRejectReasonModalVisible(false);
  };
  const requestMoreInfoModal = (data) => {
	setUserData(data);
	setIsRequestModalVisible(true);
}
 const rejectReasonModal = (data,status) => {
	setUserData(data);
	setIsRejectReasonModalVisible(true);
}
  const openPaymentData = (data) => {
    setIsPaymentModalVisible(true);
   
    axios
      .get(`/payments/program/${data.program_id}/user_name/${data.user_name}`)
      .then((res) => {
        
        setPaymentImageData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const requestMoreInfoHandler = (e) => {
	//console.log(e);
	setMoreInfo(e);
}
const rejectHandler = (e) => {
	//console.log(e);
	setRejectReason(e);
}
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
           <div style={{ float: "right" }} className="row">
                  <ExportExcel apiData={programsData} fileName={programInfo.name} />
              </div>
          </div>
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
        visible={isDocumentModalVisible}
        onOk={handleDocumentModalOk}
        onCancel={handleDocumentModalCancel}
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
       <Modal
        title="Payment Documents"
        visible={isPaymentModalVisible}
        onOk={handlePaymentModalOk}
        onCancel={handlePaymentModalCancel}
      >
        {paymentImageData.map((data, index) => {
          console.log("File extension " + data.payment_path.split(".")[1]);
          return (
            <div
              className="row"
              style={{ marginBottom: "20px", border: "1px solid black" }}
              key={index}
            >
              
              <div className="col">
                {data.payment_path.includes(".pdf") ||
                data.payment_path.includes(".zip") ? (
                  <a href={data.payment_path} target="_blank">
                    click here to download
                  </a>
                ) : (
                  <Image width={150} height={150} src={data.payment_path} />
                )}
              </div>
            </div>
          );
        })}
      </Modal>
      <Modal
        width={750}
        title="User Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <h5 style={{ color: "darkblue" }}>Personal Details </h5>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Name</span> :{" "}
                  {userData.user_name}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Gender</span> :{" "}
                  {userData.gender}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Age </span>: {userData.age}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>DOB </span>:{" "}
                  {userData.date_of_birth}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Email </span>:{" "}
                  {userData.user_email}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Phone Number </span>:{" "}
                  {userData.phoneNum}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Relationship </span>:{" "}
                  {userData.relationship}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-4">
                <p>
                  <span style={{ color: "orange" }}>Address </span>:{" "}
                  {userData.address_1} {userData.address_2}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Country </span>:{" "}
                  {userData.country}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>State </span>:{" "}
                  {userData.state}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>City </span>:{" "}
                  {userData.city}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Marital Status </span>:{" "}
                  {userData.maritalstatus}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Qualification </span>:{" "}
                  {userData.qualification}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Occupation </span>:{" "}
                  {userData.occupation}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <h5 style={{ color: "darkblue" }}>Health & Lifestyle </h5>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Health Ailments </span>:{" "}
                  {userData.health_ailments}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Lifestyle </span> :{" "}
                  {userData.lifestyle}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Health Conditions </span>:{" "}
                  {userData.health_conditions}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Medication Details </span>:{" "}
                  {userData.medicines_details}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-4">
                <p>
                  <span style={{ color: "orange" }}>Covid Vaccine Dose </span>:{" "}
                  {userData.covid_vaccine_dose}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Tobbaco Consumption </span>:{" "}
                  {userData.tobbaco_consumption}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Frequency of use of tobbaco or other substances{" "}
                  </span>
                  :{userData.frequency_details_of_tobaaco_use}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <h5 style={{ color: "darkblue" }}>Yoga Experience </h5>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Previous Yoga Experience{" "}
                  </span>{" "}
                  : {userData.previous_experience}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Expertise</span> :{" "}
                  {userData.experty_level}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>About BYVK </span>:{" "}
                  {userData.about_byuk}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Yoga Experience </span>:{" "}
                  {userData.learning_yoga}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>Style of Yoga </span>:{" "}
                  {userData.kind_of_yoga}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-4">
                <p>
                  <span style={{ color: "orange" }}>Role of Yoga teacher </span>
                  : {userData.role_of_yoga_teacher}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Planning to Teach Yoga{" "}
                  </span>
                  : {userData.planning_to_teach}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Why User wants to teach Yoga{" "}
                  </span>
                  :{userData.why_teach_yoga}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Planning to teach after this course?{" "}
                  </span>
                  :{userData.teaching_experience}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    {" "}
                    Prior teaching experience{" "}
                  </span>
                  :{userData.teaching_experience_description}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <h5 style={{ color: "darkblue" }}>
                  Details of Residential Course
                </h5>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Alternate Phone Number{" "}
                  </span>
                  : {userData.alternate_phone_number}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Name{" "}
                  </span>
                  : {userData.emergency_contactname}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Number{" "}
                  </span>
                  : {userData.emergency_contactnumber}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Relationship{" "}
                  </span>
                  :{userData.emergency_contactrelationship}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-4">
                <p>
                  <span style={{ color: "orange" }}>Languages </span>:{" "}
                  {userData.languages}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Name{" "}
                  </span>
                  : {userData.emergency_contactname2}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Number{" "}
                  </span>
                  : {userData.emergency_contactnumber2}
                </p>
              </div>
              <div className="row">
                <p>
                  <span style={{ color: "orange" }}>
                    Emergency Contact Relationship{" "}
                  </span>
                  :{userData.emergency_contactrelationship2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
      
       <Modal
        title="Reject Reason"
        visible={isRejectReasonModalVisible}
        onOk={rejectHandleOk}
        onCancel={rejectHandleCancel}
      >
        <div className="form-group" style={{ marginBottom: "50px" }}>
          <ReactQuill
            modules={modules}
            style={{ maxHeight: "300px", height: "300px" }}
            theme="snow"
            onChange={rejectHandler}
          />
        </div>
      </Modal>
    </>
  );
}

export default UserRegistertedForProgram;
