function Refund() {
	
const search = window.location.search; // returns the URL query String
const params = new URLSearchParams(search); 
const feesFromURL = params.get('fees');
const courseNameFromURL = params.get('course_name');
    return (
        <>
            <div className="ex-basic-1 pt-4">
                <div className="container">
                    <div className="row" style={{ marginTop: '100px' }}>
                        <div className="text-container" style={{ marginTop: '45px' }}>
                            
                            <h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue' }}>Fees & Cancellation Policy</h3>
                             <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'red', fontSize: '16px' }}>
                            Fee Structure : I Fully Understand that course fee of INR. {feesFromURL} {'\u20A8'} here for Indian Residents & for Non Indian Residents USD.{feesFromURL * 80 } {'\u0024'} for course {courseNameFromURL}
                            </p>
                            
                            <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                           

                            Refund and Cancellation Policy is standard across all of our programs and is as follows:
                            </p>
                            <ol>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    1) 75% refund for cancellations 30 days prior to the start date of the program.
                                    </p>
                                </li>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    2) No refunds for cancellations 15 days before the start date of the course.
                                    </p>
                                </li>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    3) There will be no refunds for a no-show or any withdrawal from the course once it has started. 
                                    </p>
                                </li>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    4) In case the course is cancelled by BYVK, the payments will be refunded.
                                    </p>
                                </li>
                            </ol>
                            <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                            In case of any emergencies, the student may contact the Bharat Yoga Vidya Kendra management for a refund. However, the final decision regarding the refund and percentage of refund would entirely be up to Bharat Yoga Vidya Kendra discretion. Please allow up to 4 weeks for us to process any refund. 
                            </p>
                            <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                            We reserve the right to revise the terms and conditions of this policy at any time, and at our sole discretion
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Refund