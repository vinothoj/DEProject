import React from 'react'
// import Amplify, {
// 	Auth
// }
// from 'aws-amplify';
// import * as AWS from 'aws-sdk';

// Amplify.configure({
// 	Auth: {
// 		mandatorySignIn: true,
// 		region: 'us-east-1',
// 		userPoolId: 'us-east-1_qAMMT5WAB',
// 		identityPoolId: 'us-east-1:f66d43e9-0077-4089-b264-85995454693b',
// 		userPoolWebClientId: '36uqh7o713vk9rutoj36alcoi2',
// 	}
// });

// AWS.config.region = 'us-east-1';

class Footer extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		// const app = this;
		// Auth.currentAuthenticatedUser().then(() => {
		// 	console.log("success");
		// 	this.setState({
		// 		isAuthenticated: true,
		// 	});
		// }, error => {
		// 	this.setState({
		// 		isAuthenticated: false,
		// 	});
		// });	
	}

	render() {
		let res = (
			<>
				<div className="navbar-header mb-4">
					<div className="col-3">
						<h1 className="tm-site-name logocolor" onClick={() => { window.location.replace("/") }}>Freelance <span style={{ color: 'black' }}>Typers</span></h1>
					</div>
					<div className="col-6">						
					</div>
					<div className="col-3">
						<div className="header-right-btn d-none d-lg-block ml-65" style={{ float: 'right' }}>
							{/* <a href="/Typing" className="btn hero-btn2">Sign up</a>{'  '}
							<a href="/Login" className="btn hero-btn2">Log in</a> */}
						</div>
					</div>
				</div>
				<div id="back-top" >
					<a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
				</div>


			</>
		)

		return res;
	}
}

export default Footer;