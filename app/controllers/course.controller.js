const Course = require('../models/course.model.js');
const QAAdmin = require('../models/qa.admin.model');
const AdditionalProperty = require('../models/additionalproperty.model');
const CourseDocument = require('../models/course_documents.model');
let response = {};

module.exports = {

    allCourses: async (req, res, next) => {
        try {
            const courses = await Course.find({});
            response.status_code = "200";
            response.status_message = "Courses Found";
            response.result = courses;


            res.status(200).json(response);
        }
        catch (err) {

            response.status_code = "404";
            response.status_message = "Courses Not Found";
            response.result = null;
            res.status(404).json(response);
        }

    },

    getCourse: async (req, res) => {
	console.log("Getting course detail sfor id ")
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
       
        if (!course) {

            response.status_code = "404";
            response.status_message = "Course not Found";
            response.result = null;
            res.status(404).json(response);

        }
        else {
            response.status_code = "200";
            response.status_message = "Course Found";
            response.result = course;
            res.status(200).json(response);
        }

    },

    getCompleteCourseDetails: async (req, res) => {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('course_documents');
        if (!course) {
            response.status_code = "404";
            response.status_message = "Course not Found";
            response.result = null;
            res.status(404).json(response);
        }
        else {
            response.status_code = "200";
            response.status_message = "Course Found";
            response.result = course;
            res.status(200).json(response);
        }

    },

    createCourse: async (req, res) => {
        try {
            const newCourse = new Course(req.body);
            const course = await newCourse.save();
            response.status_code = "200";
            response.status_message = "Course Created";
            response.result = course;


            res.status(200).json(response);
        
        }

        catch (err) {
            response.status_code = "403";
            response.errorObj = err;
            response.status_message = "Course could not be created";
            response.result = null;
            res.status(200).json(response);
        }

    },

    createCourseDocuments : async (req, res) => {

        try{
            const { course_documents } = req.body;
            const {courseId} = req.params;
           
            const cds = course_documents.map(function (element) {
                console.log(element);
                const newCD = new CourseDocument(element);
                newCD.course = courseId;
                return newCD;
    
            });
    
            const cds1 = await Promise.all(cds.map(cd => cd.save()));
            let course = await Course.findById(courseId);
    
            console.log(cds1);
            course.course_documents = cds1;
            course = await course.save();
            course = await Course.findById(courseId).populate('course_documents');
    
            response.status_code = "200";
            response.status_message = "Course documents created successfully";
            response.result = course;
            res.status(200).json(response);
    
        }

        catch(err){
            response.status_code = "403";
            response.status_message = "Course documents could not be created";
            response.result = null;
            res.status(200).json(response);
        }
   

    },



    updateCourse: async (req, res) => {

        try{
            const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });

            response.status_code = "200";
            response.status_message = "Course updated successfully";
            response.result = course;
            res.status(200).json(response);
    
            
        }

        catch(err) {
            response.status_code = "404";
            response.status_message = "Course could not be updated";
            response.result = null;
            res.status(200).json(response);
        }
      
    },


    removeCourse: async (req, res) => {
        const course = await Course.findByIdAndUpdate(req.params.courseId, {isActive:false}, {new : true} );
        if (!course) {
            response.status_code = "404";
            response.status_message = "Course could not be deleted";
            response.result = null;
            res.status(200).json(response);
           
        }
       else{
        response.status_code = "200";
        response.status_message = "Course deleted successfully";
        response.result = course;
        res.status(200).json(response);
       }
    },

}