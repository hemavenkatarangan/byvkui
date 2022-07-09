import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/courses").then((resp) => {
      // console.log(resp.data)
      setCourses(resp.data);
    });
  }, []);

  return (
    <>
      <header className="ex-header">
        <div className="container">
          <div className="row">
            <br />
            <div className="col-xl-12" style={{ textAlign: "center" }}>
              <h1>List Of Courses</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          {courses.map((data, index) => {
            return (
              <Link to={`/qa/${data._id}`}>
                <Card
                  style={{ width: 300, margin: "25px" }}
                  key={index}
                  hoverable={true}
                  cover={
                    <img
                      alt={data.name}
                      src={`https://dummyimage.com/600x400/000/fff&text=${data.name}`}
                    />
                  }
                  // actions={[
                  //   <SettingOutlined key="setting" />,
                  //   <EditOutlined key="edit" />,
                  //   <EllipsisOutlined key="ellipsis" />,
                  // ]}
                >
                  <Meta
                    avatar={
                      <Avatar
                        src={`https://dummyimage.com/600x400/000/fff&text=${data.name}`}
                      />
                    }
                    title={data.name}
                    description={
                      data.description ? data.description : `Data Updating Soon`
                    }
                  />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Courses;
