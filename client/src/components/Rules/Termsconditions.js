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

							<h3
								className="h3-large"
								style={{ fontFamily: "Poppins", color: "darkblue", marginLeft: "10px" }}
							>
								Declarations:
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
								(Description for the declaration form- The information an applicant provides on this form is treated as confidential and will only be seen by the teachers and staff involved with the course. Bharat Yoga Vidya Kendra (BYVK) treats all personal data you provide in accordance with the Personal Data Protection Act.)
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
								By submitting this application , I affirm the statements below:
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
										The information provided in this application form is true and complete to the best of my knowledge. False, incomplete, or misleading information is grounds for rejection of this application, expulsion from the program, or revocation of certification after completion of the program with no refund.
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
										I understand that BYVK from time to time may photograph, video, or otherwise record classes or events occurring at BYVK and place such photographs and videos on its website or social media platform. I hereby consent to the use of my image that may appear in any such photograph or video.
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
										I understand my physical limitations and I am sufficiently self-aware to stop or modify my participation in any activity before I become injured or aggravate a pre-existing injury.
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
										In consideration of being permitted to participate in the activities, I agree to assume full responsibility for any risks, injuries or damages, known or unknown, which I might incur as a result of participating in the yoga course at BYVK.
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
										I take full responsibility for my health and I will not hold BYVK responsible for any injuries or health problems that may incur during or after the course.
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
										I confirm that I have read and agreed with the Fee Structure and Cancellation Policy, Ashram Rules & Regulations, and Terms & Conditions,  of BYVK and The Satsang Foundation.  </p>
								</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Termsconditions;
