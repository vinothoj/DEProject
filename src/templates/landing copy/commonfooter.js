import React from 'react'

class Footer extends React.Component {
	constructor() {
		super();
	}

	render() {
		let res = (
			<>
				{/* <footer> */}
					<div className="navbar-header commonfooter">

						{/* <div className="footer-bottom-area"> */}
							{/* <div className="container"> */}
								{/* <div className="footer-border"> */}
									{/* <div className="row d-flex align-items-center"> */}
									<br />
										<div className="col-xl-12" style={{marginBottom:"-1em"}}>
											{/* <div className="footer-copy-right text-center"> */}
											{/* <hr style={{background:'#A5A7C5',marginBottom:'1em'}} /> */}
												<p>
												Freelancertypers is a registered of Freelancer Technology
												</p>
												<p>Copyright © 2020 Freelancertypers Pvt Limited</p>
											{/* </div> */}
										</div>
									{/* </div> */}
								{/* </div> */}
							{/* </div> */}
						{/* </div> */}

					</div>
				{/* </footer> */}


				<div id="back-top" >
					<a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
				</div>


			</>
		)

		return res;
	}
}

export default Footer;