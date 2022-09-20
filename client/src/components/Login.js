import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../actions/authActions'

const errStyle = {
    color: 'red',
    textAlign: 'center',
    fontSize: '.7rem'
}

function Login(props) {
    const [user, setUser] = useState({
        userName:'',
        password:'',
    })
    const errors = useSelector(state => state.errors)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    
    useEffect(() => { 
       if(auth.isAuthenticated) {
           props.history.push('/')
       }
    }, []);

    useEffect(() => {
        if(auth.isAuthenticated) {
            props.history.push('/')
        }
    })

    const handleChage = (e) => {
        const { id, value } = e.target;
        setUser(user => ({ ...user, [id]: value }));
    }

    const submitForm = () => {
        dispatch(loginUser({email_id:user.userName, password:user.password}))
    }

    return (
        <div>
            <div className="ex-form-1 pt-5 pb-5">
        <div className="container">
        <div className="row" style={{marginTop:'100px'}}>
                        <div className="col-xl-10 offset-xl-1">
                            <h1 className="text-center" style={{ fontFamily: 'Poppins'}}>Log In</h1>
                        </div>
                    </div>
            <div className="row">
                <div className="col-xl-6 offset-xl-3">
                    <div className="text-box mt-5 mb-5">
                        {/* <p className="mb-4" style={{ fontFamily: 'Poppins'}}>You don't have a user id/password? Then please <a className="blue" href="/register">Sign Up</a></p> */}
                            <div className="form-group">
                                <input type="email" onChange={(e) => handleChage(e)} className="form-control-input notEmpty" id="userName" />
                                <label className="label-control" htmlFor="email">Email</label>
                                <p style={errStyle}>{errors.email}</p>
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={(e) => handleChage(e)} className="form-control-input notEmpty" id="password" />
                                <label className="label-control" htmlFor="password">Password</label>
                                <p style={errStyle}>{errors.password}</p>
                            </div>
                            <div className="form-group checkbox">
                                <input type="checkbox" id="terms" value="Agreed-to-Terms" />I agree with the site's stated <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms & Conditions</a>
                            </div>
                            <p style={errStyle}>{errors.verificationPending ? errors.verificationPending : errors.emailnotfound}</p>
                            <div className="form-group" style={{ fontFamily: 'Poppins'}}>
                                <button type="submit" onClick={(e) => submitForm(e)} className="form-control-submit-button">Log In</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    );
}

export default Login;