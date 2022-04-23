import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/authActions'
import $ from 'jquery';

function Nav() {
    const user = useSelector(state => state.auth)
    const [isAuthenticated, setAuthenticated] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.isAuthenticated) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    })

    const logOutUserFromPanel = () => {
        dispatch(logoutUser())
    }

    const toggler = () => {
        $('.offcanvas-collapse').toggleClass('open')
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light">
            <div className="container">
                <a className="navbar-brand logo-image" href="/" style={{marginLeft:'12px'}}>
                    {/* <img src="../images/logo.png" alt="Bharat Yoga Vidya Kendra" />
                    <b>Bharat Yoga Vidya Kendra</b> */}
                    {/* <b className="subtext">An Initiative Of Satsang Foundation</b> */}

                    <div className='row'>

                        <div className='col'>
                            <img src="../images/logo.png" alt="Bharat Yoga Vidya Kendra" />
                        </div>
                        <div className='col' style={{ marginLeft: '-28px', marginTop: '10px' }}>
                            <div className='row'>
                                <b style={{ padding: '3px', color: 'darkblue', fontWeight: 'bold', lineHeight: 'normal', fontFamily: 'Droid Serif', fontSize: '18px'}}>Bharat Yoga Vidya Kendra</b>
                            </div>
                            <div className='row'>
                                <b style={{ color: 'gray', fontSize: '.85rem', fontFamily: 'Droid Serif', fontStyle: 'italic', marginLeft: '.2rem',fontSize: '12px' }}>Lokah Samastah Sukhino Bhavantu</b>
                            </div>
                        </div>
                    </div>

                </a>

                <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" id="navbarBut" onClick={(e) => toggler(e)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ml-auto" style={{ fontFamily: 'Poppins' }}>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" style={{ color: 'black' }} href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" style={{ color: 'black' }} href="/about">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" style={{ color: 'black' }} href="/srim">Sri M</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="dropdown01" style={{ color: 'black' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Courses</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown01">
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/yogam">Yoga M - Beginners Course</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/kaushalam">KausalaM - Intermediate Course</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/abhayam">AbhayaM - Senior Citizens Course</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/ttc">TTC - Yoga Teachers Training Course</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/avistaran">Avistaran - Yoga for Professionals
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item page-scroll" style={{ color: 'black' }} href="/sakhyam">SakhyaM - Course for Women
                                </a>

                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link page-scroll" style={{color:'black'}} href="/courses">Courses</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link page-scroll" style={{ color: 'black' }} href="/contactus">Contact Us</a>
                        </li>
                        <li>
                        <img style={{height:'32px'}} src="/images/logosatsang1.png" alt="byvk"></img>
                    </li>
                  {/*  <li className="nav-item">
                            <a className="nav-link page-scroll" style={{ color: 'black' }} href="/register">Sign Up</a>
                    </li>*/}
                    </ul>
                    {/* {isAuthenticated ? <li className="nav-item">
                            <a className="nav-link page-scroll" href="/user">Hi, {user.user.name}</a>
                        </li> : <div>
                        <span className="nav-item">
                            <a className="btn-solid-sm page-scroll" href="/register">Sign Up</a>
                        </span>
                    </div>}
                    
                    {isAuthenticated ? <div>
                        <span className="nav-item">
                            <a className="btn-solid-sm page-scroll" onClick={(e) => logOutUserFromPanel(e)}>Logout</a>
                        </span>
                    </div> : ''} */}
                    {/* <div>

                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default Nav
