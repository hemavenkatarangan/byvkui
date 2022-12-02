import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table,Tooltip } from "antd";
import {
	
  UploadOutlined
  
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function YourRegistrations() {
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
    console.log(user.userData.email_id,"user");
    getUsersPrograms();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Course",
      dataIndex: "programs",
      key: "name",
      render:(data) => data[0].name,
      
    },
    {
      title: "Start Date",
      dataIndex: "programs",
      key: "program_start_date",
      render: (data) => getFormatedDate(data[0].program_start_date),
    },
    {
      title: "End Date",
      dataIndex: "programs",
      key: "program_end_date",
      render: (data) => getFormatedDate(data[0].program_end_date),
    },
    
    {
      title: "Reject Reason",
      dataIndex: "reject_reason",
      key: "reject_reason",
     
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
     
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
	
        <>
          

          
               {isAuthenticated && data.status === "APPLICATION_SUBMITTED" ?  (
            <>
              
               <Tooltip title="Upload Payments">
                <Link
                to={data.payment_url}
              >
                    <Button
                      shape="circle"
                      icon={<UploadOutlined />}
                      
                    />
                    </Link>
                  </Tooltip>{" "}
              
            </>
          ) :""}
            
          
        </>
      ),
    },
  ];

  const getFormatedDate = (date) => {
    return moment(date).format("DD-MMM-YYYY");
  };

  
  
  const getUsersPrograms = (data) => {
    axios
      .get("/usermanagement/user/"+user.userData.email_id)
      .then((res) => {
        if (res.data.status_code === "200") {
          
          for(var i=0;i<res.data.result.length;i++)
            {
	            var userDetails=res.data.result[i];
	            var userProgram=userDetails.programs[0];
	            console.log(userProgram);
	            var paymentsfeesCourseNameUrl="";
	            if (userDetails.nationality === "Indian" || userDetails.country === "IN") {
									paymentsfeesCourseNameUrl =
										"/payments?fees=" +
										userProgram.program_fee +
										"&usdfees=0" +
										"&course_name=" +
										userProgram.name +
										"&user_name=" +
										userDetails.user_name +
										"&c_id=" +
										window.location.href.split("/")[window.location.href.split("/").length - 1] +
										"&userManagementId=" + userDetails._id;
								}
								else {
									paymentsfeesCourseNameUrl =
										"/payments?fees=0" +
										"&usdfees=" + userProgram.program_fee_in_usd +
										"&course_name=" +
										userProgram.name +
										"&user_name=" +
										userDetails.name +
										"&c_id=" +
										window.location.href.split("/")[window.location.href.split("/").length - 1] +
										"&userManagementId=" + userDetails._id;

								}
					res.data.result[i].payment_url=paymentsfeesCourseNameUrl;
								console.log(res.data.result[i])
	            
	            
	            
			}
			setProgramsData(res.data.result);
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
                Your Registrations
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

export default YourRegistrations;
