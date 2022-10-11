import {  useEffect } from 'react'


const data = [
    { 
        typeName:'Course Dashboard',
        imgUrl: 'images/courses/kausalamthumbnail.png',
        typeUrl: '../coursedashboard',
    },{ 
        typeName:'Program Dashboard',
        imgUrl: 'images/courses/kausalamthumbnail.png',
        typeUrl: '../programdashboard',
    },{ 
        typeName:'Media Dashboard',
        imgUrl: 'images/courses/kausalamthumbnail.png',
        typeUrl: '../imagesdashboard',
    }
]

function Admin() {
    
    
    useEffect(() => {
       
    }, [])

    return (
        <>
            <div className="ex-basic-1 pt-5 pb-5" style={{ marginTop: '30px' }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-xl-10 offset-xl-1" >
                            <h1 style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Poppins', color: 'darkblue', fontSize: '32px' }}>Admin Data</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {
                        data.map((d, i) => {
                            return <div className="col-lg-4" key={i} style={{marginBottom:'50px'}}>
                            <a href={d.typeUrl}>
                                <div className="card">
                                    <div className="card-body" style={{ textAlign: 'center' }}>
                                        <img alt="" src={d.imgUrl} ></img>
                                        <div className="text">
                                            <div className="testimonial-author" style={{ color: 'darkblue' }}>{d.typeName}</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        })
                    }
                   
                </div>
            </div>

        </>
    )
}

export default Admin