import { useEffect, useState } from 'react'




const content = [{
	name: 'Education',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-education',
	image: null
}, {
	name: 'Health',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-health',
	image: null
}, {
	name: 'Environment',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-environment',
	image: null
}, {
	name: 'Manav Ekta Mission',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-manav-ekta-mission',
	image: null
}, {
	name: 'Outreach',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-outreach',
	image: null
}, {
	name: 'Bharat Yoga Vidya Kendra',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-bharat-yoga-vidya-kendra',
	image: null
}, {
	name: 'The Sacred Grove',
	link: 'https://satsang-foundation.org/satsang-foundation/#symple-tab-the-sacred-grove',
	image: null
}]

function About() {

	const [showPhil, setShowPhil] = useState('none')
	const [showPresident, setShowPresident] = useState('none')
	const [showUpcoming, setShowUpcoming] = useState('none')

	useEffect(() => {
		var url = window.location.href
		var splitingForPhil = url.split('#')[1]
		switch (splitingForPhil) {
			case 'phil': setShowPhil('block')
				setShowPresident('none')
				setShowUpcoming('none')
				break;
			case 'president': setShowPhil('none')
				setShowPresident('block')
				setShowUpcoming('none')
				break;
			case 'upcoming': setShowPhil('none')
				setShowPresident('none')
				setShowUpcoming('block')
				break;
			default: setShowPhil('none')
				setShowPresident('none')
				setShowUpcoming('none')
				break;
		}
	}, [])

	return (
		<>

			<div className="ex-basic-1 pt-5 pb-5" style={{ marginTop: '30px' }}>
				<div className="container">
				<div className="row" >
                        <div className="col-xl-10 offset-xl-1" >
                            <h1 style={{textAlign:'center', marginTop:'50px',fontFamily: 'Poppins', color: 'darkblue',fontSize: '32px'}}>About Us</h1>
                        </div>
                    </div>
					<div className="row" style={{marginTop:'-62px'}}>
						<div className="col-lg-12">
							<img className="img-fluid mt-5 mb-3" src="../images/AboutUs.png" style={{ width: '100%', height: '500px' }} alt="smart uniforms" />
						</div>
					</div>
				</div>
			</div>
			<div className="ex-basic-1 pt-4" style={{ marginTop: '-50px' }}>
				<div className="container">
					<div className="row">
						<div className="col-xl-10 offset-xl-1">
							<div className="text-container">
								<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Our Mission</h1>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Our mission is to bring about change in the minds and bodies of people so that they can discover the full potential of their mental and physical faculties through Yoga.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Our goal is to demystify and present Yogic teachings in a simple, relevant way that is applicable in modern times. We aim to teach yoga as a practical science, making it accessible to all regardless of their background or where they live.
								</p>
							</div>

							<div className="text-container">
								<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>About Bharat Yoga Vidya Kendra</h1>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Sri M has founded the Bharat Yoga Vidya Kendra (BYVK), an initiative of the Satsang Foundation, with the vision of spreading the ancient science of Yoga for the wellbeing of all.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Sri M is a living yogi, who from the age of nine has been guided on the path of Yoga by many teachers. Sri M was initiated into the Nath Sampradaya by his Guru, Sri Maheshwarnath Babaji at age 19. The Nath lineage has been known to preserve the science of Yoga over the millenia, and the Naths have authored many of the ancient yogic texts that are still referenced today.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Sri M has practiced and understood a wide range of spiritual and yogic practices, such as those in Hatha Yoga, Kriya Yoga, and Yoga Tantra from different lineages and traditions. He has been guiding many practitioners and seekers for decades.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									BYVK functions under the direct guidance of Sri M. The teachings offered by us are rooted in ancient yogic texts such as the Yoga Sutras of Patanjali, Haṭha Yoga Pradipika, Shiva Samhita and Yoga Upanishads.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									BYVK is designed like a modern day Gurukula, where these time tested teachings are taught in a way that is applicable to today’s society. BYVK recognises that the needs and challenges of every individual are different, thus each course offers practical methodologies to help the individual explore deeper aspects of themselves in a way that is relevant to them
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Bharat Yoga Vidya Kendra is recognised by the Government of India and Ministry of AYUSH as an official Yoga Training Center.
								</p>

							</div>
							<div style={{ marginBottom: '45px', display: showPhil }} id="phil">

							</div>
							<div className="text-container" >
								<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Our Yoga Philosophy</h1>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									“Yoga is a practice by which any human being who is earnestly interested can transform his or her life in a positive way. Yoga has a much vaster implication than just postures. It starts with the body, goes to the mind and proceeds to the spirit.”
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									~Sri M
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									In modern times, many have come to associate Yoga with Asana, considering it to be a series of exercises to improve one's health and to acquire a beautiful body. While others associate Yoga as something that belongs to a particular religion or a culture.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Our aim at BYVK is to make Yoga accessible to anyone who is looking for ways to improve their life and turn within. Yoga is a non-denominational science that helps us understand our true essence. It takes a step by step approach that starts with the body, proceeds to the mind and finally to the spiritual level.
								</p>

							</div>
							<div className="text-container">
								<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Our Values</h1>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Our core values are as follows:
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Yoga is Scientific and practical</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Yoga is a scientific and systematic way to understand the true essence of the self. However, unlike many sciences that are inaccessible to the common person, Yoga offers practical tools that any human can use to experiment and verify the results on their own.
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Yoga as Non-denominational and Non-discriminatory</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									We teach Yoga as a non-denominational practice that can be done by anybody. We offer Yoga to people of all backgrounds and honour their existing religious, cultural and backgrounds. Anyone who sincerely and dedicatedly practices, gets the desired results.
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Discovering the self through Yoga</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Yoga is a step by step way for each individual to discover themselves as they are right now. Yogic practices enable the practitioner to cultivate a sharp and unprejudiced mind, allowing the practitioner to see themselves in a new light.
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Every individual matters</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									We believe that personal transformation requires an individualised approach. We specifically design our class sizes to be small, and train our teachers to be attentive, so that each student receives the appropriate attention, care and support that nurtures them to grow.
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>Samvaad</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									Deep understanding can only be cultivated through Saamvaad, dialogue. Our approach is to teach the Yogic path in a way that encourages enquiry, exploration and dialogue between participants and the teacher. We believe that transformation cannot occur through blindly following what a teacher says, but by exploring the teachings for oneself.
								</p>
								<h3 className="h3-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>The Yogashala and BYVK Location</h3>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									The Yogashala was inaugurated on 11 December 2020. In a simple ceremony, Sri M consecrated the main deity, Rishi Patanjali at the Yogashala’s temple. Built under Sri M’s personal supervision, the Yogashala is an aesthetically designed, naturally lit and well-ventilated hall that can comfortably accommodate a class of 25 yoga practitioners. It offers a safe and nurturing  space for students to learn, practise, and experience Yoga.
								</p>
								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
									BYVK is located at the Satsang Foundation Campus, on the outskirts of Madanapalle. The Ashram is surrounded by hills on all sides, and the Ashram premises consists of beautiful trees, flowers, birds, cows, a small pond with lilies and fish.
								</p>
								
								<div style={{ marginBottom: '100px', display: showPresident }} id="president">

								</div>
								<div className="text-container" >
									<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>BYVK News </h1>
									
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Bharat Yoga Vidya Kendra (BYVK), an initiative of the Satsang Foundation, has been founded by Sri M with the vision of spreading the ancient science of Yoga to all.</p> 
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Our aim is to make the ancient yogic teachings relevant to modern times.</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>BYVK is situated at the Satsang Foundation Campus in Madanapalle. There is an opening for a Yoga Teacher  on an immediate basis. </p>

									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: 'darkblue', fontSize: '16px' }}>Mentioned below are the vacancy details -</p>

									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>All requirements are Mandatory:</p>

    								<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}><b>Education:</b> A Postgraduate Degree in any subject</p>
    										   <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Yoga Qualification: Level 3 certificate from the Ayush ministry of Yoga.</p>
    										   <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Teaching Experience: 4-7 years of teaching yoga experience on document</p>
                                               <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Language skills: Fluent in written and spoken English</p>
                                               <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Other skills - Basic knowledge of computers and MS office</p>

                                    <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Pay scale will be at par with experience and market standards.</p>

                                    <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Please visit <a href="https://bharatyogavidyakendra.in">bharatyogavidyakendra.in</a> to know more about us.</p> 

                                    <p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>Please email a copy of your resume and a cover letter to  <a href="mailto:byvk.resume@gmail.com">byvk.resume@gmail.com </a>by 30th March (deadline for applying).</p>
									
									<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>BYVK Highlights </h1>
									
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										The first ever residential Yoga Teacher Training Course (TTC) conducted by Bharat Yoga Vidya Kendra (BYVK) in February 2021 was inaugurated by the Honourable President of India, Sri Ramnath Govind. He visited the Yogashala and interacted with the students and teachers.
									</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										He encouraged everyone to keep up with their daily practices and have the spirit to learn and enquire ever kindled in their hearts.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>



										<img alt="" src="images/highlights/Picture1-PresidentwithTTC1.png"></img>



									</div>
									</div>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										The second residential TTC conducted in April 2021 was visited by the former Chief Justice of India, Mr Sharad Arvind Bobde. In an interaction session with the students, he explained the importance of discipline in the life of a disciple.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>



										<img alt=""src="images/highlights/Picture2-CJIwithTTC2.png"></img>



									</div>
									</div>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										To support the elderly in becoming physically strong and independent in their golden years, BYVK conducted the first ever Yoga retreat AbhayaM in November 2021. It was a sheer delight to see the enthusiasm and dedication of participants who were more than eager to become students again.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>



										<img alt="" src="images/highlights/Picture4-AbhayaMstudents.png"></img>



									</div>
									</div>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										Our founder Sri M was conferred with the Padma Bhushan Award 2020, for the distinguished service of high order in the field of Spirituality, by the Hon’ble President of India, Shri Ram Nath Kovind, in New Delhi on 8th Nov 2021. Sri M received the award in the ‘Spiritualism’ category, for his work on social issues and promotion of inter-faith peace and harmony.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>



										<img alt="" src="images/highlights/Picture5-SriMPadmaBhushan.png"></img>



									</div>
									</div>
								</div>
								
								


								<div style={{ marginBottom: '100px', display: showUpcoming }} id="upcoming">

								</div>
								<div className="text-container">
									<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>BYVK Upcoming Courses</h1>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										In continuing with our efforts to spread wellbeing through Yoga, we are coming up with new and interesting courses.
									</p>
									<h4 className="h4-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										<strong>Avistaran - </strong>residential retreat for professionals
									</h4>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										This course is for people with busy lives and stressful jobs. It will help them pause and reconnect with their body and mind.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>



										<img alt="" src="images/upcomingcourses/Picture1-Avistaran.png"></img>



									</div>
									</div>
									<h4 className="h4-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										<strong>SakhyaM - </strong>online course for women
									</h4>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										This will be designed to help women look after their health better and address common health problems like PCOS, hormonal imbalance and early menopause which many women face.
									</p>
									<div className="row">
									<div className="col-lg-12" style={{ textAlign:'center'}}>

										<img alt="" src="images/upcomingcourses/Picture2-SakhyaM.png"></img>

									</div>
									
								</div>
								</div>
								<div className="text-container">
									<h1 className="h1-large" style={{ fontFamily: 'Poppins', color: 'darkblue', fontSize: '24px' }}>About the Satsang Foundation</h1>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										Bharat Yoga Vidya Kendra is an initiative of The Satsang Foundation.
									</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										The Satsang Foundation, established by Sri M, is a meeting point for spiritual seekers of all persuasions.
									</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										The key objectives and activities of the Foundation derive from the dual intents of concern for mankind and the search for truth. Sri Ms teachings and the work of the foundation are designed to help people to explore ways to expand their spiritual horizons and lead a multi-dimensional life. The Satsang Foundation also extends a helping hand to the less privileged of society.
									</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										Some of The Satsang Foundation’s projects include the Satsang Vidyalaya, Satsang Rural School, Chanda Satsang Vidyalaya, Sacred Grove Wellnes & Study Centre, MyTree, Jal Seva, Swasthya Kendra, Satsang Seva Mission and Manav Ekta Mission.
									</p>
									<p className="p-large" style={{ fontFamily: 'Poppins', textAlign: 'justify', color: '#333436', fontSize: '16px' }}>
										To learn more you can <a href="https://satsang-foundation.org/" style={{color: 'darkblue'}}>visit their website.</a>
									</p>

								</div>

								<div className="row" style={{marginTop:'50px'}}>
								</div>
								
								
							</div>


						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default About
