import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table, Switch, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
//import 'react-quill/dist/quill.snow.css';
import "../Quill.css";
import fileUploadUrl from "../../constants/constants";

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Poppins"];
Quill.register(Font, true);

const errStyle = {
  color: "red",
  textAlign: "center",
  fontSize: ".7rem",
};

function CourseDashboard() {
  const user = useSelector((state) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [course, setcourse] = useState({
    course_id: "",
    course_name: "",
    course_title: "",
    course_description: "",
    course_thumbnail: [],
    course_documents: [],
    carosal_images: [],
    course_contents: "",
    isActive: true,
  });
  const [errObj, setErrObj] = useState({
    course_name: "",
    course_title: "",
    course_description: "",
    course_thumbnail: "",
    course_documents: "",
    carosal_images: "",
    course_contents: "",
  });
  const [admins, setAdmins] = useState([
    "jyoti.byvk@gmail.com",
    "hema.s.kasturi@gmail.com",
    "divakarvishwamithra@gmail.com",
  ]);
  const [adminAuth, setAdminAuth] = useState(false);
  const [boolVal, setBoolVal] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
  const [courseData, setCourseData] = useState([]);

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
    getCoursesData();
  }, []);

  // useEffect(() => {

  // }, [])

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Course Description",
      dataIndex: "course_description",
      key: "course_description",
    },
    {
      title: "Course Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (tag) => (
        <center>
          {tag ? (
            <Tag color="green" key={tag}>
              True
            </Tag>
          ) : (
            <Tag color="red" key={tag}>
              False
            </Tag>
          )}
        </center>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (id, data) => (
        <>
          <EditOutlined
            onClick={(e) => {
              editCourse(data);
            }}
          />{" "}
          <DeleteOutlined onClick={(e) => deleteCourse(data)} />
        </>
      ),
    },
  ];

  const editCourse = (data) => {
    // console.log(data)
    setcourse((course) => ({
      ...course,
      course_id: data._id,
      course_name: data.course_name,
      course_description: data.course_description,
      course_thumbnail: data.course_thumbnail,
      course_title: data.course_title,
      course_contents: data.contents,
      course_documents: data.course_documents,
      carosal_images: data.carosal_images,
      isActive: data.isActive,
    }));
    setIsModalVisible(true);
    setBoolVal(true);
  };

  const addCourseData = () => {
    // course.course_name = '',
    // course.course_description = '',
    // course.course_duration = '',
    // course.course_thumbnail =  null,
    // course.course_fees =  ''
    setCourseDataAsNull();
    setIsModalVisible(true);
  };

  const setCourseDataAsNull = () => {
    setcourse((course) => ({
      ...course,
      course_name: "",
      course_title: "",
      course_description: "",
      course_thumbnail: [],
      course_documents: [],
      carosal_images: [],
      course_contents: "",
      isActive: true,
    }));
  };

  const deleteCourse = (data) => {
    // console.log(data)
    axios
      .delete("/courses/" + data._id)
      .then((res) => {
        // console.log(res)
        getCoursesData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoursesData = () => {
    axios
      .get("/courses/")
      .then((res) => {
        // console.log(res)
        setCourseData(res.data.result.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCourseData = () => {
    // validations here
    let valid = true;
    if (course.course_name.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        course_name: "Course name should be minimum 3 letters",
      }));
    }

    if (course.course_title.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        course_title: "Course title should be minimum 3 letters",
      }));
    }

    if (course.course_description.length <= 3) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        course_description: "Course description should be minimum 15 letters",
      }));
    }

    if (course.course_thumbnail.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        course_thumbnail: "Course thumbnail should have 1 pic",
      }));
    }

    if (course.carosal_images.length <= 0) {
      valid = false;
      setErrObj((errObj) => ({
        ...errObj,
        carosal_images: "Course carosal images should have 1 pic",
      }));
    }

    if (valid) {
      submitWithImages();
    }
  };

  const submitWithImages = (data) => {
    var obj = course;
    var obj = {
      course_name: course.course_name,
      course_title: course.course_title,
      course_description: course.course_description,
      course_thumbnail: course.course_thumbnail,
      contents: course.course_contents,
      isActive: true,
      carosal_images: course.carosal_images,
    };
    if (boolVal) {
      axios
        .patch("/courses/" + course.course_id, obj)
        .then((res) => {
          // console.log(res)
          setIsModalVisible(false);
          setCourseDataAsNull();
          getCoursesData();
          setBoolVal(false);
          alert(res.data.status_message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("/courses/", obj)
        .then((res) => {
          // console.log(res)
          setIsModalVisible(false);
          setCourseDataAsNull();
          getCoursesData();
          setBoolVal(false);
          alert(res.data.status_message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onCourseChange = (e) => {
    const { id, value } = e.target;
    setcourse((course) => ({ ...course, [id]: value }));
  };

  const onCourseThumbnailChange = (e) => {
    var form = new FormData();
    form.append("course_name", course.course_name);
    form.append("files", e.target.files[0]);

    axios
      .post(fileUploadUrl, form)
      .then((res) => {
        // console.log(res)
        setcourse((course) => ({
          ...course,
          course_thumbnail: res.data.result[0],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCourseFilesChange = (e) => {
    var form = new FormData();
    form.append("course_name", course.course_name);
    for (let i = 0; i < e.target.files.length; i++) {
      form.append("files", e.target.files[i]);
    }
    axios
      .post(fileUploadUrl, form)
      .then((res) => {
        // console.log(res)
        setcourse((course) => ({ ...course, carosal_images: res.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setEditorValue = (e) => {
    // console.log(e)
    setcourse((course) => ({ ...course, course_contents: e }));
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
                Course Dashboard
              </h1>
            </div>
          </div>
          {/* <div className="row" style={{marginTop:'-62px'}}>
                        <div className="col-lg-12">
                            <img className="img-fluid mt-5 mb-3" src="../images/courses/AbhayaM.png" style={{ width: '100%', height: '500px' }} alt="byvk" />
                        </div>
                    </div> */}
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
                  onClick={(e) => addCourseData()}
                >
                  Add Course
                </Button>
              </div>
              {/* <div className="row"> */}
              <Table width="100%" columns={columns} dataSource={courseData} />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Course"
        width="75%"
        visible={isModalVisible}
        onOk={(e) => submitCourseData(e)}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control-input notEmpty"
            value={course.course_name}
            id="course_name"
            onChange={(e) => onCourseChange(e)}
            required
          />
          <label className="label-control" htmlFor="name">
            Course Name
          </label>
          <p style={errStyle}>{errObj.course_name}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control-input notEmpty"
            value={course.course_title}
            id="course_title"
            onChange={(e) => onCourseChange(e)}
            required
          />
          <label className="label-control" htmlFor="course_title">
            Course Title
          </label>
          <p style={errStyle}>{errObj.course_title}</p>
        </div>
        <div className="form-group">
          <input
            type="textarea"
            className="form-control-input notEmpty"
            value={course.course_description}
            id="course_description"
            onChange={(e) => onCourseChange(e)}
            required
          />
          <label className="label-control" htmlFor="course_description">
            Course Description
          </label>
          <p style={errStyle}>{errObj.course_description}</p>
        </div>
        <div className="form-group" style={{ marginBottom: "50px" }}>
          <ReactQuill
            modules={modules}
            style={{ maxHeight: "300px", height: "300px" }}
            theme="snow"
            value={course.course_contents || ""}
            onChange={(e) => setEditorValue(e)}
          />
        </div>
        {/* <div className="form-group"> */}
        {/* <label className="label-control" htmlFor="course_thumbnail"> */}
        {/* Course Thumbnail : &nbsp;&nbsp; */}
        {/* </label> */}
        <div className="row form-group">
          <div className="col-xl-6">
            <div className="col-xl-6">Course Thumbnail :</div>
            <div className="col-xl-6">
              <input
                type="file"
                className=""
                id="course_thumbnail"
                onChange={(e) => onCourseThumbnailChange(e)}
                required
              />
              <p style={errStyle}>{errObj.course_thumbnail}</p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="col-xl-6">Carosal Images :</div>
            <div className="col-xl-6">
              <input
                type="file"
                multiple
                className=""
                id="course_images"
                onChange={(e) => onCourseFilesChange(e)}
                required
              />
              <p style={errStyle}>{errObj.carosal_images}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CourseDashboard;
