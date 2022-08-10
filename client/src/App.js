import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser, setUserData } from "./actions/authActions";
import PrivateRoute from "./privateroute/PrivateRoute";
import Home from './components/Home';
import Login from './components/Login';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import Nav from './components/Nav';
import Register from './components/Register';
import Footer from './components/Footer';
import About from './components/About';
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
import Terms from "./components/Rules/Terms";
import Privacy from "./components/Rules/Privacy";
import Refund from "./components/Rules/Refund";
import GenericCourses from "./components/Courses/GenericCourse";
import CourseDashboard from "./components/Admin/CourseDashboard";
import ProgramDashboard from "./components/Admin/ProgramDashboard";
import CreateProgram from "./components/Admin/CreateProgram";
import MediaDashboard from "./components/Admin/ImagesDashboard";
import Careers from "./components/Careers";
import UsersQuery from "./components/Admin/UsersQuery";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  const userData = localStorage.userData;
  console.log(userData);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setUserData(JSON.parse(userData)));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
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
        <Route exact path="/course/:id" component={GenericCourses} />
        <Route exact path="/ttc" component={TTC} />
        <Route exact path="/kaushalam" component={KaushalaM} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/abhayam" component={AbhayaM} />
        <Route exact path="/avistaran" component={Avistaran} />
        <Route exact path="/sakhyam" component={SakhyaM} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/refund" component={Refund} />
        <Route exact path="/careers" component={Careers} />
       
        <Route exact path="/userquery" component={UsersQuery} />
        
          <PrivateRoute exact path="/home" component={Home} />
          {/* <Route path="/404" component={NotFound} /> */}

          {/* <Route component={NotFound} /> */}
        </Router>
      <Footer />
    </Provider>
  );
}

export default App;
