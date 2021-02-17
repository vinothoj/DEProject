import React from 'react'

class Footer extends React.Component {
	constructor() {
		super();
	}

	render() {
		let res = (
			<>
				<footer>
					<div className="footer-wrappper section-bg" data-background="assets/img/gallery/footer-bg.png">

						<div className="footer-area footer-padding">
							<div className="container">
								<div className="row justify-content-between">
									<div className="col-xl-4 col-lg-5 col-md-4 col-sm-6">
										<div className="single-footer-caption mb-50">
											<div className="single-footer-caption mb-30">

												<div className="footer-logo mb-25">
													<a href="index.html"><h1 style={{ fontWeight: 'bold', color: 'white' }}>Freelance Typers</h1></a>
												</div>
												<div className="footer-tittle">
													<div className="footer-pera">
														<p>The automated process starts as soon as your clothes go into the machine.</p>
													</div>
												</div>

												<div className="footer-social">
													<a href="#"><i className="fab fa-twitter"></i></a>
													<a href="#"><i className="fab fa-facebook-f"></i></a>
													<a href="#"><i className="fab fa-pinterest-p"></i></a>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
										<div className="single-footer-caption mb-50">
											<div className="footer-tittle">
												<h4>Our solutions</h4>
												<ul>
													<li><a href="#">Categories</a></li>
													<li><a href="#">Projects</a></li>
													<li><a href="#">Contests</a></li>
													<li><a href="#">Local Jobs</a></li>
													<li><a href="#">Get verified</a></li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
										<div className="single-footer-caption mb-50">
											<div className="footer-tittle">
												<h4>Company</h4>
												<ul>
													<li><a href="/contactus">Contact us</a></li>
													<li><a href="#">About us</a></li>
													<li><a href="#">How it works</a></li>
													<li><a href="#">Sitemap</a></li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
										<div className="single-footer-caption mb-50">
											<div className="footer-tittle">
												<h4>Support</h4>
												<ul>
													<li><a href="#">Privacy Policy</a></li>
													<li><a href="#">Cookies Policy</a></li>
													<li><a href="#">Terms and Conditions</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="footer-bottom-area">
							<div className="container">
								<div className="footer-border">
									<div className="row d-flex align-items-center">
										<div className="col-xl-12 ">
											<div className="footer-copy-right text-center">
											<hr style={{background:'#A5A7C5',marginBottom:'1em'}} />
												<p>
												Freelancertypers is a registered of Freelancer Technology
												</p>
												<p>Copyright © 2020 Freelancertypers Pvt Limited</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</footer>


				<div id="back-top" >
					<a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
				</div>


			</>
		)

		return res;
	}
}

export default Footer;