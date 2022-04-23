import { Button } from 'antd'

const cData = [
	{
        cName: 'SakhyaM',
        cDescription: '',
        date: '23 May 2022 - 4th Jun 2022',
        month: '',
        cId: 1,
        link:'sakhyam'
    },
    {
        cName: 'Yoga M Beginners Course',
        cDescription: '',
        date: '7 May 2022 - 29th May 2022',
        month: '',
        cId: 1,
        link:'yogam'
    },
    {
        cName: 'TTC Yoga Teachers Training',
        cDescription: '',
        date: '6th June 2022 - 8th July 2022',
        month: '',
        cId: 2, 
        link:'ttc'
    },
    {
        cName: 'AbhayaM Senior Citizens Course',
        cDescription: '',
        date: '3 April - 17 April',
        month: '',
        cId: 3,
        link:'abhayam'
    },
    {
        cName: 'KausalaM Intermediate Course',
        cDescription: '',
        date: '9 April - 24 April',
        month: '',
        cId: 3,
        link:'kausalam'
    },
    {
        cName: 'Avistaran Corporate Professionals Course',
        cDescription: '',
        date: '30 April - 8 May',
        month: '',
        cId: 3,
        link:'avistaran'
    }
]

function LandingCoursesCalender() {

    const handleCourseReg = (id) => {
        console.log(id)
    }

    return (
        <>
           
                <div className="container"style={{ background: "url(../images/header-background.png) center center no-repeat" }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="heading" style={{color:'darkblue', fontFamily:'Poppins', marginTop:'20px',marginBottom:'20px', fontSize: '24px'}}>Course Calendar</h2>
                            {/* <p className="p-heading"></p> */}
                        </div>
                    </div>
                    {/* style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}} */}
                   
                        {cData.map((data, index) => {
                            return <><div className="row">
                                <div className="col-lg-4" style={{textAlign: 'center'}}>
                                    <h5 style={{fontFamily:'Poppins',fontSize:'16px'}}>{data.date}</h5>
                                    <p style={{fontFamily:'Poppins',fontSize:'16px'}}>{data.month}</p>
                                </div>
                                <div className="col-lg-4">
                                    <h4 style={{fontFamily:'Poppins',fontSize:'16px', textAlign: 'center'}}>{data.cName}</h4>
                                    <p style={{fontFamily:'Poppins',fontSize:'16px'}}>{data.cDescription}</p>
                                </div>
                                <div className="col-lg-4" style={{textAlign:'center'}}>
                                    <div className="" style={{ marginTop: '0px' }}>
                                        <Button type="primary" style={{ fontFamily:'Poppins',width: '50%', background: '#f3cd74', color: 'black', borderRadius: '18px'}}>
                                            <a href={data.link}>Learn More</a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                                <hr style={{marginTop: '4px'}}/> 
                                </>
                        })}
                    

                </div>
           
        </>
    )
}

export default LandingCoursesCalender