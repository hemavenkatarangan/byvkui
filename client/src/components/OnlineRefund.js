function OnlineRefund() {
	
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
                           

                            Refund and Cancellation Policy as follows:
                            </p>
                            <ol>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                  No refunds for cancellations. 

 
                                    </p>
                                </li>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    In case the course is rescheduled or canceled due to unforeseen circumstances, the liability of Bharat Yoga Vidya Kendra or The Satsang Foundation is limited to the refund of deposited fees only.

                                    </p>
                                </li>
                                <li>
                                    <p className="" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'black', fontSize: '16px' }}>
                                    No refunds for a no-show or any withdrawal from the course once it has started. In case of emergencies, participants will remain eligible to attend the same course in future without making new payment , upto one financial year.
                                    </p>
                                </li>
                               
                            </ol>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnlineRefund