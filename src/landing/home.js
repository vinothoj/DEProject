import React from 'react'
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

import Nav from '../templates/landing/nav'
import Footer from '../templates/landing/footer'
import { random } from 'faker';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			totalJobs1: 1015455,
			verfiedworkers1: 118312,
			earned1: 1105255,
			totalJobs: 1015455,
			verfiedworkers: 118312,
			earned: 1105255,
			random: 0,
		}
	}
	numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	componentDidUpdate(prevState) {
		// Are we adding new items to the list?
		// Capture the scroll position so we can adjust scroll later.

		// this.setState({
		// 	totalJobs1: prevState.totalJobs ,
		// 	verfiedworkers1: prevState.verfiedworkers ,
		// 	earned1: prevState.earned 
		// })
	}

	componentDidMount = () => {
		let random1 = Math.round(Math.random() * 250, 0)
		this.setState({
			totalJobs: this.state.totalJobs + random1,
			verfiedworkers: this.state.verfiedworkers + random1,
			earned: this.state.earned + random1
		})
		setInterval(() => {
			random1 = Math.round(Math.random() * 250, 0)
			var random2 = random1 % 2 == 0 ? random1-2500 :2500 + random1   
			var random3 = random1 % 2 == 0 ? random2 - random1 :random2 + random1 
			
			this.setState({
				totalJobs1: this.state.totalJobs + random2,
				verfiedworkers1: this.state.verfiedworkers + random2,
				earned1: this.state.earned + random2,
				totalJobs: this.state.totalJobs + random3,
				verfiedworkers: this.state.verfiedworkers + random3,
				earned: this.state.earned + random3,
				random: random1
			})
		}, 10000)
	}
	render() {

		let res = (
			<>
				<Nav />
				<main>
					<section className="slider-area ">
						<div className="slider-active">
							<div className="single-slider slider-height">
								<div className="container">
									<div className="row justify-content-center" style={{ width: '100%', marginLeft: '5px' }}>
										<div className="col-xl-8 col-lg-11 col-md-12">
											<div className="hero__caption text-center">
												<h1 data-animation="bounceIn" data-delay="0.2s">Freelance Typers is a world's best market place for online work</h1>
												<p data-animation="fadeInUp" data-delay="0.4s">Make money by working on micro jobs</p>
												<Link to="/Typing" className="btn hero-btn" data-animation="fadeInUp" data-delay="0.7s">Start Typing Test Now<div>&</div> Signup</Link>
											</div>
										</div>
									</div>
									<br />
									<div className="row text-center" style={{ color: 'white', marginTop: '3em' }}>
										<div className="col-12 col-md-4">
											<h1><CountUp start={this.state.totalJobs1} end={this.state.totalJobs} duration={20} /></h1>
											<h2>Total Works</h2>
										</div>
										<div className="col-12 col-md-4">
											<h1><CountUp start={this.state.verfiedworkers1} end={this.state.verfiedworkers} duration={20} /></h1>
											<h2>Verified Workers</h2>
										</div>
										<div className="col-12 col-md-4">
											<h1>$<CountUp start={this.state.earned1} end={this.state.earned} duration={20} /></h1>
											<h2>Earned by Workers</h2>
										</div>
									</div>

								</div>
							</div>
							<div className="single-slider slider-height">
								<div className="container">
									<div className="row justify-content-center" style={{ width: '100%', marginLeft: '5px' }}>
										<div className="col-xl-8 col-lg-11 col-md-12">
											<div className="hero__caption text-center">
												<h1 data-animation="bounceIn" data-delay="0.2s">Freelance Typers is a world's best market place for online work</h1>
												<p data-animation="fadeInUp" data-delay="0.4s">Make money by working on micro jobs</p>
												<Link to="/Typing" className="btn hero-btn" data-animation="fadeInUp" data-delay="0.7s">Start Typing Test Now<div>&</div> Signup</Link>
											</div>
										</div>
									</div>
									<br />
									<div className="row text-center" style={{ color: 'white', marginTop: '3em' }}>
										<div className="col-12 col-md-4">
											<h1><CountUp start={this.state.totalJobs1} end={this.state.totalJobs} duration={20} /></h1>
											<h2>Total Works</h2>
										</div>
										<div className="col-12 col-md-4">
											<h1><CountUp start={this.state.verfiedworkers1} end={this.state.verfiedworkers} duration={20} /></h1>
											<h2>Verified Workers</h2>
										</div>
										<div className="col-12 col-md-4">
											<h1>$<CountUp start={this.state.earned1} end={this.state.earned} duration={20} /></h1>
											<h2>Earned by Workers</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>


					<section id="ourservices" className="our-services">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-7 col-lg-8">
									<div className="section-tittle text-center mb-80">
										<h2 data-animation="fadeInUp">How it works</h2>
										<h3 className="mb-2" style={{ fontSize: '2em' }}>As a freelance typers worker you</h3>
									</div>
								</div>
							</div>
							<div className="row">
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services text-center bg-primary text-light">
										<h3>Can work from home</h3>
									</div>
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/color/50/000000/hard-working.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Create your account</a></h5>
											<p>Create your account if typing speed above 10wpm.</p>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services text-center bg-secondary text-light">
										<h3> Choose your own work hours</h3>
									</div>
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/color/48/000000/training.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Click & Start work</a></h5>
											<p>There is a lot of work to be done. Join us and earn more.</p>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services text-center bg-warning text-light">
										<h3>Get paid for doing good works</h3>
									</div>
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/color/48/000000/push-a-box.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Finish & Submit work</a></h5>
											<p>Once complete of your work, start the counting.</p>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/fluent/48/000000/money-box.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Earn money</a></h5>
											<p>You can earn money from various type of works.</p>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/cute-clipart/48/000000/check-file.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Verify your KYC</a></h5>
											<p>Before payment paid, Verification is important.</p>
										</div>
									</div>
								</div>
								<div className=" col-lg-4 col-md-6 col-sm-6">
									<div className="single-services mb-30">
										<div className="services-ion">
											<img src="https://img.icons8.com/fluent/48/000000/bank-card-dollar.png" />
										</div>
										<div className="services-cap">
											<h5><a href="#">Get money by your bank</a></h5>
											<p>After completing the account verification, You can get the money in your bank.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>


					<section className="testimonial-area fix" id="review">
						<div className="container" >
							<div className="row justify-content-center">
								<div className="col-xl-9 col-lg-10">
									<div className="section-tittle text-center">
										<h2>Amazing customer review</h2>
										<div >	Workers rate of freelance typers (4.6/5 design) <img src="assets/img/review.png" height="40" /> based on 893,457 verified reviews <img src="assets/img/review_clearly.png" height="40" />
						</div>
									</div>
								</div>
							</div>
							<div className="testimonial-wrapper section-bg2 pt-135" data-background="assets/img/gallery/section_bg01.png">
								<div className="row align-items-center justify-content-center">
									<div className=" col-lg-8 col-md-12 col-sm-9">
										<div className="about-caption">
											<div className="h1-testimonial-active dot-style">
												<div className="single-testimonial text-center">
													<div className="testimonial-caption">
														{/* <img src="assets/img/icon/quotes-sign.png" alt="" className="quotes-sign" />
										<p>I would like to work with freelancetypers.com and i have to learn typing skill and english skill and earn online on Freelance Typers to money.</p> */}
														<img src="assets/img/reviews/1.png" alt="" className="quotes-sign reviewimg" />
													</div>
													<div className="testimonial-founder d-flex align-items-center justify-content-center">
														<div className="founder-text">
															{/* <span>Kaushik B</span> */}
															<p></p>
														</div>
													</div>
												</div>
												<div className="single-testimonial text-center">
													<div className="testimonial-caption">
														<img src="assets/img/reviews/2.png" alt="" className="quotes-sign reviewimg" />
														{/* <img src="assets/img/icon/quotes-sign.png" alt="" className="quotes-sign" />
										<p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replica;ition of thei designers ijtls intended csents your se.</p> */}
													</div>
													<div className="testimonial-founder d-flex align-items-center justify-content-center">

														<div className="founder-text">

														</div>
													</div>
												</div>
												<div className="single-testimonial text-center">
													<div className="testimonial-caption">
														<img src="assets/img/reviews/3.png" alt="" className="quotes-sign reviewimg" />
														{/* <img src="assets/img/icon/quotes-sign.png" alt="" className="quotes-sign" />
										<p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replica;ition of thei designers ijtls intended csents your se.</p> */}
													</div>
													<div className="testimonial-founder d-flex align-items-center justify-content-center">

														<div className="founder-text">

														</div>
													</div>
												</div>
												<div className="single-testimonial text-center">
													<div className="testimonial-caption">
														<img src="assets/img/reviews/4.png" alt="" className="quotes-sign reviewimg" />
														{/* <img src="assets/img/icon/quotes-sign.png" alt="" className="quotes-sign" />
										<p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replica;ition of thei designers ijtls intended csents your se.</p> */}
													</div>
													<div className="testimonial-founder d-flex align-items-center justify-content-center">

														<div className="founder-text">

														</div>
													</div>
												</div>
												<div className="single-testimonial text-center">
													<div className="testimonial-caption">
														<img src="assets/img/reviews/5.png" alt="" className="quotes-sign reviewimg" />
														{/* <img src="assets/img/icon/quotes-sign.png" alt="" className="quotes-sign" />
										<p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replica;ition of thei designers ijtls intended csents your se.</p> */}
													</div>
													<div className="testimonial-founder d-flex align-items-center justify-content-center">

														<div className="founder-text">

														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a href="/reviews" className="btn1 btn-primary" style={{ margin: '5em 0em 0em 44em' }} >Next</a>
						{/* onClick={()=>{this.props.history.push("/reviews/#review")}} */}
					

					</section>

					<section className="our-services">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-7 col-lg-8">
									<div className="section-tittle text-center mb-80">
										<h2>Millions of jobs waiting for you</h2>
										<h3>Join our freelance typers community</h3>
										<br />
										<button className="btn hero-btn">Join Free</button>
									</div>
								</div>
							</div>

						</div>
					</section>

				</main>
				<Footer />
			</>
		)

		return res;
	}
}

export default Home;