import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser, setUserData } from "./actions/authActions";
import PrivateRoute from "./privateroute/PrivateRoute";
import Home from "./components/Home";
import OnlineRefund from "./components/OnlineRefund";
import Payments from "./components/Payments";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Footer from "./components/Footer";
import About from "./components/About";
import Admin from "./components/Admin/Admin";
import Qa from "./components/Admin/qa";
import Courses from "./components/Courses";
import DisplayEvents from "./components/DisplayEvents";
import SriM from "./components/SriM";
import Gallery from "./components/Gallery";
import YogaM from "./components/Courses/YogaM";
import TTC from "./components/Courses/TTC";
import KaushalaM from "./components/Courses/KaushalaM";
import AbhayaM from "./components/Courses/AbhayaM";
import Avistaran from "./components/Courses/Avistaran";
import SakhyaM from "./components/Courses/SakhyaM";
import ContactUs from "./components/ContactUs";
import RaiseProblem from "./components/RaiseProblem";
import Terms from "./components/Rules/Terms";
import Privacy from "./components/Rules/Privacy";
import Refund from "./components/Rules/Refund";
import GenericCourses from "./components/Courses/GenericCourse";
import CourseDashboard from "./components/Admin/CourseDashboard";
import ProgramDashboard from "./components/Admin/ProgramDashboard";
import ProblemDashboard from "./components/Admin/ProblemDashboard";
import CreateProgram from "./components/Admin/CreateProgram";
import MediaDashboard from "./components/Admin/ImagesDashboard";
import Careers from "./components/Careers";
import RegisterProgram from "./components/Admin/RegisterProgram";
import UserRegistertedForProgram from "./components/Admin/RegisterdUsersData";
import UsersQuery from "./components/Admin/UsersQuery";
import Termsconditions from "./components/Rules/Termsconditions";
import Rulesregulations from "./components/Rules/Rulesregulations";
import UserDashboard from "./components/UserDashboard";
import CompleteProfile from "./components/Admin/CompleteProfile";
import YourRegistrations from "./components/Admin/YourRegistrations";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  const userData = localStorage.userData;
  // console.log("Logger user data ");
  // console.log(userData);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setUserData(JSON.parse(userData)));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Nav />
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/srim" component={SriM} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/qa/:id" component={Qa} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/events/:id" component={DisplayEvents} />
        <Route exact path="/yogam" component={YogaM} />
        <Route exact path="/coursedashboard" component={CourseDashboard} />
        <Route exact path="/programdashboard" component={ProgramDashboard} />
        <Route exact path="/createprogram" component={CreateProgram} />
        <Route exact path="/createprogram/:id" component={CreateProgram} />
        <Route exact path="/mediadashboard" component={MediaDashboard} />
        <Route exact path="/problemdashboard" component={ProblemDashboard} />
        <Route exact path="/course/:id" component={GenericCourses} />
        <Route exact path="/ttc" component={TTC} />
        <Route exact path="/kaushalam" component={KaushalaM} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/raiseproblem" component={RaiseProblem} />
        <Route exact path="/abhayam" component={AbhayaM} />
        <Route exact path="/avistaran" component={Avistaran} />
        <Route exact path="/sakhyam" component={SakhyaM} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/refund" component={Refund} />
        <Route exact path="/careers" component={Careers} />
        <Route exact path="/registercourse/:id" component={RegisterProgram} />
        <Route exact path="/userquery" component={UsersQuery} />
        <Route exact path="/termsconditions" component={Termsconditions} />
        <Route exact path="/rulesregulations" component={Rulesregulations} />
        <Route exact path="/mydashboard" component={UserDashboard} />
        <Route exact path="/onlinerefund" component={OnlineRefund} />
        <Route exact path="/completeprofile" component={CompleteProfile} />
        <Route exact path="/yourregistrations" component={YourRegistrations} />
        <Route
          exact
          path="/userforprogram/:id"
          component={UserRegistertedForProgram}
        />
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          
        </Switch>
       
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
