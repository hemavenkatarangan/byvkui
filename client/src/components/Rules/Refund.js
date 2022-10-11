function Refund(props) {
  const feesFromURL = props.fee;
  const courseNameFromURL = props.name;
   const residential = props.residential;
  return (
    <>
      <div className="ex-basic-1 pt-4">
        <div className="container">
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="text-container" style={{ marginTop: "45px" ,marginLeft:"10px",marginRight:"10px",overflow: "auto"}}>
              <h3
                className="h3-large"
                style={{ fontFamily: "Poppins", color: "darkblue" ,marginLeft:"10px"}}
              >
                Fees & Cancellation Policy
              </h3>
              

              <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "12px",
                }}
              >
                Refund and Cancellation Policy is standard across all of our
                programs and is as follows:
              </p>
              {residential? (
              <ol>
                <li>
                  <p
                    className=""
                    style={{
                      fontFamily: "Poppins",
                      textAlign: "justify",
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                     75% refund for cancellations 30 days prior to the start
                    date of the program.
                  </p>
                </li>
                <li>
                  <p
                    className=""
                    style={{
                      fontFamily: "Poppins",
                      textAlign: "justify",
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                     No refunds for cancellations 15 days before the start
                    date of the course.
                  </p>
                </li>
                <li>
                  <p
                    className=""
                    style={{
                      fontFamily: "Poppins",
                      textAlign: "justify",
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                     There will be no refunds for a no-show or any withdrawal
                    from the course once it has started.
                  </p>
                </li>
                <li>
                  <p
                    className=""
                    style={{
                      fontFamily: "Poppins",
                      textAlign: "justify",
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                     In case the course is cancelled by BYVK, the payments
                    will be refunded.
                  </p>
                </li>
                <li>
                <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "12px",
                }}
              >
                In case of any emergencies, the student may contact the Bharat
                Yoga Vidya Kendra management for a refund. However, the final
                decision regarding the refund and percentage of refund would
                entirely be up to Bharat Yoga Vidya Kendra discretion. Please
                allow up to 4 weeks for us to process any refund.
              </p>
                </li>
                <li>
                <p
                className=""
                style={{
                  fontFamily: "Poppins",
                  textAlign: "justify",
                  color: "black",
                  fontSize: "12px",
                }}
              >
                We reserve the right to revise the terms and conditions of this
                policy at any time, and at our sole discretion
              </p>
              </li>
              </ol>
              
              ):( <ol>
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
                               
                            </ol>)}
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Refund;
