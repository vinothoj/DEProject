import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import Cookies from 'universal-cookie'

import { connect } from 'react-redux'

import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'
import axios from '../API.js'
import Modal from '../templates/modal';

import { validateEmail, clear, validateFields, customValidation } from '../common.js';
import { Auth } from 'aws-amplify';
import CSVReader from "react-csv-reader";

const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			id: '1', username: '', email: '', password: '', repassword: '', mobile: '', isAgree: false, isError: false, isLoad: false,
			error: { username: '', email: '', password: '', repassword: '', mobile: '', isAgree: '' },
			modalopen: false, successMsg: '', isSignup: true, verifySignup : false, errorMessage: ''
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onValidation = (cb) => {
		const emptyFields = [
			{ key: 'username', errVal: 'Enter Username' },
			{ key: 'email', errVal: 'Enter Email Address' },
			{ key: 'password', errVal: 'Enter Password' },
			{ key: 'repassword', errVal: 'Enter Confirm Password' },
			{ key: 'mobile', errVal: 'Enter Mobile Number' }
		]
		const emailFields = [
			{ key: 'email', errVal: 'Incorrect Email Format..!!' }
		]
		const data = validateFields(this.state, emptyFields, emailFields)

		if (true) {
			if (this.state.mobile.length < 10)
				customValidation(data, 'mobile', 'Mobileno should be 10 numbers')
			else if (this.state.password.length < 6)
				customValidation(data, 'password', 'Password must be 6 characters')
			else if (this.state.password !== this.state.repassword)
				customValidation(data, 'repassword', "Password Doesn't Match")
			else if (this.state.isAgree === false)
				customValidation(data, 'isAgree', "Please select Agreement!")
		}
		axios.get("/Users", { params: { email: data.email } }).then(res => res.data.data).then(res => {

			if (res.length > 0)
				customValidation(data, 'email', 'Email Already Exist..!! Try Another..!!')
			this.setState({ data })
			return cb(data)
		})
	}
	clickButton1 = () => {
		this.setState({ modalopen: !this.state.modalopen })
	}
	onSubmit = () => {
		const data = this.state
		data.userid = 1
		this.onValidation(res => {
			if (!res.isError) {
				if (this.myRef.current === null) {
					this.myRef.current = ''
					this.setState({ isLoad: true })
					this.signup(data);	
				}
			}
		})
	}

	signup = (data) => {
		const attributes = {
			email:  String(data.email),
			name: data.username,
			phone_number: `+91${data.mobile}`
		};

		Auth.signUp({
			username:  String(data.email),
			password : data.password,
			attributes,
		}).then((pass) => {
			//console.log("user success",pass);
			this.setState({
				isLoad: false,
				verifySignup: true,
				isSignup: false,
				successMsg: `The verification code is sent to ${data.email}`,
			});
			
		}, error => {
			console.log("user add error:",error);
			this.setState({
				isLoad: false,
				errorMessage: error.message,
			});
		});
	};

	confirmSignup = () => {
		const data = this.state
        Auth.confirmSignUp(data.email, data.signupCode).then(
            () => {
				axios.post("/Users/Add", data).then(res => {
					if (res.data.status === 'success')
						setTimeout(() => {
							cookies.set('email', data.email);
							cookies.set('name', data.username);
							cookies.set('userPassword', data.password);
							cookies.set('workerid', '1');
							cookies.set('works', 23476);
							this.setState({ isLoad: false })
							this.props.history.push({ pathname: '/bank', state: { id: res.data.data.insertId, page: 'register' } })
							// window.location.replace('/bank')
						}, 3000)
					this.setState({ successMsg: 'Thanks for joining us!' })
				}).catch(err => {
					console.log(err)
				})
            },
            (error) => {
                console.log(error);
            }
        );
    };

	resendSignup = () => {
        const data  = this.state;
        this.setState({
            loading: true,
            error: '',
        });
        Auth.resendSignUp(data.email).then(
            (pass) => {
                this.setState({
                    loading: false,
                    successMessage: `The verification code is sent to ${data.email}`,
                });
            },
            error => {
                this.setState({
                    loading: false,
                    errorMessage: error.message !== '' ? error.message : 'Something went wrong!',
                });
            }
        );
    };

	userCheck = async (email) => {
		let popup;
        popup = await axios.get("/Users", { params: { email: email } }).then((res) => { console.log("dsds",res); });
        return popup;
	}

	// handleForce = (data, fileInfo) => {
	// 	console.log("list data",data);	
	// 	if (data.length > 0) {
    //         data.map((item) => {
    //             //console.log("item name",item.email);
	// 			//console.log("user email",this.userCheck(item.email));
	// 			const attributes = {
	// 				email:  String(item.email),
	// 				name: String(item.name),
    //         		user_status: "CONFIRMED",
	// 			};

	// 			Auth.signUp({
	// 				username: `${item.email}`,
	// 				password: `Test@123`,
	// 				attributes,
	// 			}).then((pass) => {
	// 				console.log("user success",pass);					
	// 			}, error => {
	// 				console.log("user add error:",error);
	// 			});
    //         });
    //     }

	// 	// axios.get("/Users", { params: { email: data.email } }).then(res => res.data.data).then(res => {
	// 	// 	if (res.length > 0)
	// 	// 		customValidation(data, 'email', 'Email Already Exist..!! Try Another..!!')
	// 	// 	this.setState({ data })
	// 	// 	return cb(data)
	// 	// })
	// };

	render() {
		const {
			isSignup,
			verifySignup
		} = this.state;

		const papaparseOptions = {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
		  };

		let load = (<>
			<div className="loading-container">
				<div className="loading"></div>
				<div id="">loading</div>
			</div>
		</>)
		const typingsuccess1 = (
			<div>
				<p style={{ fontSize: '14px' }}>This Acceptable Use Policy this policy describes permitted and prohibited uses of Freelance typers. Please read carefully and ensure that you understand the terms and conditions fully.  The examples described in this Policy are not exhaustive. We may modify this Policy at any time by posting a revised version on the freelance typers website. If you violate this Policy or authorize or help others to do so, we may suspend or terminate your freelance typers account. In addition, if we believe or suspect that any transaction or activity violates this Policy or is otherwise a misuse of Freelance typers, we may take other corrective action that we deem appropriate, including blocking. Freelance Typers is a public crowd marketplace, Freelance typers is not designed to be a platform for sharing or publishing workloads containing personal information. It is your responsibility to determine whether your works content contains any personal information.</p>
				<p style={{ fontSize: '14px' }}>Freelance Typers allowed Only users that are 18 years of age or older can participate in freelancetypers.com micro jobs programs. International members can participate in freelancetypers.com micro jobs programs except in territories where the local government laws prohibit. By choosing to use our portal, you confirm to use your own name, email address and accurate contact information. You agree not to use a false identity. Users are not allowed to maintain multiple accounts registered with different email addresses. You pledge to keep your username and password confidential. Users are free to make changes to their password regularly to ensure better online security and account integrity. User shall report all unauthorized access to their account immediately to freelancetypers.com/contactus to ensure their own safety and the safety of the freelancetypers.com network. Once a user give a poor a quality of works freelance typers team give a mail warning for one time, Again the user give poor quality of work freelance typers block the user and suspend the account.freelancetypers.com features various membership options for the users that are looking for something more than just basic features. we allowed only for usa citizen for do the jobs otherwise if you are other country citizens you must submit your kyc details and then thirty five dollar one time processing fees and dollar to inr conversion costs. Users are strictly prohibited from selling or renting their account. As a user you must main tented ninety percentage of accuracy otherwise your account was suspended any time so give good quality of work. Accounts suspected of such activities will have restricted access and could be terminated. Our website have millions of jobs all data  are including the legal rights so don’t download and share any files. we does not make any direct or indirect warranties or representations that the operation of our website will be absolutely error free or uninterrupted. The errors that may be present in this website or the interruptions that may occur do not make the company liable in any way for the damages or the losses suffered by the user. </p>
				<p style={{ fontSize: '14px' }}>Freelancetypers.com shall also not be held liable for any loss or damage that results due to electronic loss of data, malware or virus infection of the user’s PC or other digital causes that result from the use of our website. The member or the user takes complete responsibility for their online security including the use of appropriate antivirus and antimalware software and keeping them up to date.</p>
				<p style={{ fontSize: '14px' }}>You hereby appoint us as your payment processing agent for the limited purpose of receiving payments on your behalf from users that authorize payments to you directly or to third-party services that enable transactions with you. Users will receive a receipt upon payment that will indicate that payment has been made on the applicable date. Our obligation to remit funds collected by us on your behalf shall be limited to funds that we have actually received and that are not subject to Chargeback or reversal, and we shall have no obligation to pursue any collection action against any user. Receipt of funds from users by us on your behalf in connection with Service transactions shall be deemed receipt of funds from users by you and will satisfy the obligations owed to you by users in the amount of the applicable payment by the user, even if we fail to remit such funds received from users. Subject to restrictions described in this Agreement, we will disburse to your Bank Account funds for transactions submitted through the Service to the extent we have received payment in accordance with our Policies governing disbursement and reserves. Payments will be made only to a Bank Account. Freelance Typers knows that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. So create your account and start earning now. Thank You. Happy earnings!!</p>
			</div>
		)
		let res;
		res = (
			<>
				{this.state.isLoad ? load : ''}
				<div className="background-image1"></div>
				<Header />
				<div className="row text-left centerscreen" style={{ minHeight: '74vh', marginRight: '0px', marginLeft: '0px' }}>
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">

					{/* Aws cognito import user csv 
					<div className="container">
						<CSVReader
							cssClass="react-csv-input"
							label="Select CSV"
							onFileLoaded={this.handleForce}
							parserOptions={papaparseOptions}
						/>
						<p>and then open the console</p>
					</div>*/}

					{isSignup && ( <Card>
							<CardBody className="padding-20 font-weight-bold">
								{this.state.errorMessage !== '' ? <div className="error" style={{ textAlign: 'center', color: 'red' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.errorMessage}</div> : ''}
								<h3>Create account</h3>
								<br />
								<div className="form-group">
									<label>Your name</label>
									<input name="username" type="text" className="form-control" onChange={this.onChange} value={this.state.username} />
									{this.state.error.username}
								</div>
								<div className="form-group">
									<label>Email ID</label>
									<input name="email" type="email" className="form-control" onChange={this.onChange} value={this.state.email} />
									{this.state.error.email}
								</div>
								<div className="form-group">
									<label>Mobile number</label>
									<input name="mobile" type="number" className="form-control" onChange={this.onChange} value={this.state.mobile} maxength="10" onInput={this.maxLengthCheck} />
									{this.state.error.mobile}
								</div>
								<div className="form-group">
									<label>Password</label>
									<input name="password" type="password" className="form-control" onChange={this.onChange} value={this.state.password} />
									{this.state.error.password}
								</div>
								<div className="italicnormal">Passwords must be at least 6 characters.</div>
								<br />
								<div className="form-group">
									<label>Confirm password</label>
									<input name="repassword" type="password" className="form-control" onChange={this.onChange} value={this.state.repassword} />
									{this.state.error.repassword}
								</div>
								<div className="form-group mt-4">
									<input name="isAgree" type="checkbox" onChange={this.onChange} value={this.state.isAgree} />
		&nbsp;&nbsp;I accept the <a href="#" onClick={() => { this.setState({ modalopen: !this.state.modalopen }) }}>Terms & conditions</a>
									<br />
									{this.state.error.isAgree}
								</div>

								<div className="text-right">
									<button ref="btn" className="button col-12" onClick={this.onSubmit}>Create FreelanceTypers Account</button>
								</div>
								<br />
								{this.state.successMsg !== '' ? <div className="success" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.successMsg}</div> : ''}
								<hr />
								<div className="italicnormal">Already have an account?  <a href="#">Sign-In</a></div>
							</CardBody>
						</Card> )}

						{verifySignup && ( <Card>
							<CardBody className="padding-20 font-weight-bold">
								{/* <h3>Verification</h3> */}
								{this.state.errorMessage !== '' ? <div className="error" style={{ textAlign: 'center', color: 'red' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.errorMessage}</div> : ''}
								<div className="form-group">
									<label>Verify your email address</label>
									<input name="signupCode" type="text" className="form-control" onChange={this.onChange} value={this.state.signupCode} />
									{this.state.error.signupCode}
								</div>
								{this.state.successMsg !== '' ? <div className="success" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.successMsg}</div> : ''}
								<div className="text-right">
									<button ref="btn" className="button col-12" onClick={this.confirmSignup}>Submit</button>
								</div>
								<br/>
								<p className="signup-text">
									Request new {` `}
									<a href="#" onClick={this.resendSignup}>verification code</a>
								</p>
							</CardBody>
						</Card> )}
					</div>
					<div className="col-md-4 col-12"></div>
				</div>
				{this.state.modalopen ? <Modal size="xl" open={true} button1='Close' clickButton1={this.clickButton1} modalheader="Terms & Conditions" modalbody={typingsuccess1} /> : ''}

				<Footer />
			</>
		)
		return res;
	}
}

const mapStateToProps = (state) => ({ common: state.common })

export default connect(mapStateToProps)(App);