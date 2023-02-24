import React from "react";

const Termsconditions = (props) => {
	const course_name = props.course_name;
	return (
		<>
			<div className="ex-basic-1 pt-4">
				<div className="container">
					<div className="row" style={{ marginTop: "100px" }}>
						<div className="text-container" style={{ marginTop: "45px", marginLeft: "10px", marginRight: "10px", overflow: "auto" }}>
							<h3
								className="h3-large"
								style={{ fontFamily: "Poppins", color: "darkblue", marginLeft: "10px" }}
							>
								Terms and Conditions:
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
								Use of this site is provided by Bharat Yoga Vidya Kendra subject
								to the following Terms and Conditions:
							</p>
							<ul>
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
										Participants are responsible for their own medical and health care. They should carry their own medicines, if necessary. Minimal medical care is available at the Ashram and can be provided only in case of emergency.

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
										Bharat Yoga Vidya Kendra or The Satsang Foundation cannot be held liable for any accidents, injuries or thefts during the course. Participants may take their own health insurance for the duration of their stay at the Ashram.
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
										Bharat Yoga Vidya Kendra and The Satsang Foundation reserves the right to use any pictures/videos taken during the course for its records and promotional purposes.
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
										The training manual and study materials provided for reference during the course is an intellectual property of the Bharat Yoga Vidya Kendra. The copyright of the content is reserved with Bharat Yoga Vidya Kendra and it is forbidden to share/distribute it in the public domain.

									</p>
									<p
										className=""
										style={{
											fontFamily: "Poppins",
											textAlign: "justify",
											color: "black",
											fontSize: "12px",
										}}
									>
										Bharat Yoga Vidya Kendra or The Satsang Foundation is not responsible if the Ashram environment or the course does not meet the personal expectations of the participant. We only assure you what is mentioned on the website.
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
										If you have any doubts regarding your physical or mental fitness and health, please check with us before submitting your application through a separate email. By receiving your application, we assume that you are physically and mentally fit and stable.
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
										All disputes are subject to the Indian Law and will be decided only by the competent court in India to the exclusion of any other court or way of settling legal or other disputes.
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
										If a participant is expelled from the course due to non-observance of ashram rules/regulations then no refund can be claimed.
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
										No sponsorships or discounts are being offered.
									</p>
								</li>
								{course_name === "T T C" ?
									(<li>
										<p
											className=""
											style={{
												fontFamily: "Poppins",
												textAlign: "justify",
												color: "black",
												fontSize: "12px",
											}}
										>
											90 % attendance is compulsory for the Ayush Certification Exam. This means a student is allowed to miss a maximum of 10 sessions in total. This includes sessions missed due to health or other emergencies.
										</p>
									</li>) : ""}



							</ul>

							
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Termsconditions;
