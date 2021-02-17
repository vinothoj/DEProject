import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import Cookies from 'universal-cookie'
import ReactDOMServer from 'react-dom/server';

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'
import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter';
import { Auth } from 'aws-amplify';
const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1', email: '', isError: false,
			password: '', passcode: '', rpasscode: '',
			isSend: false,
			error: { email: '', },
			successMsg: '',
			isforgotpassword: true,
            isNewPassReq: false,
			errorMessage : '',
			successMessage: ''
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onValidation = (cb) => {
		const emptyFields = [
			{ key: 'accountname', errVal: 'Enter Accountname' },
			{ key: 'accno', errVal: 'Enter Account No.' },
			{ key: 'ifsc', errVal: 'Enter IFSC' },
			{ key: 'bankname', errVal: 'Enter Bank Name' },
		]
		const data = validateFields(this.state, emptyFields)

		this.setState({ data })
		return data.isError
	}

	htmlMail = () => {
		var passcode = Math.floor(100000 + Math.random() * 900000)
		this.setState({ rpasscode: passcode })
		return (
			<div>
				<h4>Email: {this.state.email}</h4>
				<h4>Password Code: {passcode}</h4>
				<br />
				<h3>Regards</h3>
				<h3>FreelanceTypers</h3>
			</div>
		)
	}

	onSubmit = () => {
		this.confirmFP();
		// if (this.state.isSend) {
		// 	var data = {}
		// 	data.email = this.state.email
		// 	data.password = this.state.password
		// 	if (this.state.rpasscode.toString() === this.state.passcode.toString()) {
		// 		axios.post("/Updatepassword", data).then(res => {
		// 			alert('Password changed successfully!')
		// 			this.props.history.push('/login')
		// 			// console.log(res)
		// 		})
		// 	}
		// 	else {
		// 		alert('Passcode mismatch!')
		// 	}

		// }
		// else {
		// 	const body = ReactDOMServer.renderToStaticMarkup(this.htmlMail())

		// 	const data = {}
		// 	data.Port = 587
		// 	data.Service = "Hostinger"
		// 	data.Host = "smtp.flockmail.com"
		// 	data.Username = "support@freelancetypers.com"
		// 	data.Password = "gowtham123"
		// 	data.From = "Freelance Typers Support<support@freelancetypers.com>"
		// 	data.To = this.state.email
		// 	data.Subject = "Forgot Password"
		// 	data.Text = body
		// 	axios.post("https://donkeycargo.xyz/api/user/sendmail", data).then(res => {
		// 		if (res.data.msg.includes("250")) {
		// 			this.setState({ isSend: true })
		// 			alert('Forgot password mail sent successfully..!!')
		// 		}
		// 	}).catch(err => {
		// 		console.log(err)
		// 	})
		// }
	}

	confirmFP = () => {
		var data = {}
		data.email = this.state.email;
		data.password = this.state.password;

        Auth.forgotPasswordSubmit(this.state.email, this.state.passcode, this.state.password).then(
            pass => {
                this.setState({
                    verifyFP: false,
                    loading: false,
                    successMessage: 'Password reset successfully!',
                });

				var data = {};
				data.email = this.state.email;
				data.password = this.state.password;
				axios.post("/Updatepassword", data).then(res => {
					alert('Password changed successfully!')
					this.props.history.push('/login')
					// console.log(res)
				})
            },
            (error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    error: error.message,
                    errorMessage: error.message,
                });
            }
        );
    };

	reSignup = (data) => {
		const attributes = {
			email:  String(data.Email),
			name: data.Name,
			phone_number: `+91${data.Mobile}`
		};

		Auth.signUp({
			username:  String(data.Email),
			password : data.Password,
			attributes,
		}).then((pass) => {
			//console.log("user success",pass);
			this.setState({
				verifyFP: false,
        	    isforgotpassword: false,
				verifySignup: true,
				loading: false,
				successMsg: `The verification code is sent to ${data.Email}`,
			});
			
		}, error => {
			console.log("Forgot user add error:",error.code);
			if(error.code === 'UsernameExistsException') {
				this.resendforgotPassword();
			}
		});
	};

	confirmSignup = () => {
		const data = this.state
        Auth.confirmSignUp(data.email, data.signupCode).then(
            (res) => {
				this.props.history.push('/login');
            },
            (error) => {
                console.log("data confirm", error);
            }
        );
    };

	resendSignup = () => {
        const data  = this.state;
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


	forgotPassword = (type) => {
		axios.get("/Users", { params: { email: this.state.email } }).then(res => {
			const item = res.data.data;
			if(item.length > 0) {
				console.log("dsds",item);
				console.log("email true",item[0].Email);
				this.reSignup(item[0]);
			} else {
				console.log("email false");
			}
		},
		(error) => {
			console.log("email check",error);
			this.setState({
				loading: false,
				error: error.message,
				errorMessage: error.message,
			});
		});
    
    };

	resendforgotPassword = (type) => {
		const data = this.state;
        Auth.forgotPassword(data.email).then(
            pass => {
                this.setState({
                    verifyFP: true,
                    isforgotpassword: false,
                    loading: false,
                    successMessage: `The verification code is sent to ${data.email}`,
                });

                if (type === 'resendcode') {
                    this.setState({
                        verifySuccessMsg: `The verification code is sent to ${data.email}`,
                        resetType: type,
					});
                } else {
                   
                }
            },
            error => {
                this.setState({
                    verifyFP: false,
                    loading: false,
                    errorMessage: error.message,
                });
            }
        );
	}

	render() {
		const {
			isforgotpassword,
			verifyFP,
			isNewPassReq,
			verifySignup
		} = this.state;

		let res;
		res = (
			<>
				<div className="background-image2">					</div>
				<Header />

				<div className="row text-left centerscreen" style={{ minHeight: '74vh', marginRight: '0px', marginLeft: '0px' }}>
					{/* <h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1> */}
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
						{this.state.errorMessage !== '' ? <div className="error" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.errorMessage}</div> : ''}
						{this.state.successMessage !== '' ? <div className="success" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.successMessage}</div> : ''}
						{isforgotpassword && (
							<CardBody className="padding-20 font-weight-bold">
								<h3>Forgot Password</h3>
								<br />
								<div className="form-group">
									<label>Email</label>
									<input name="email" type="text" className="form-control" onChange={this.onChange} value={this.state.email} />
									{this.state.error.email}
								</div>
								<br />
								<div className="text-right">
									<button className="button col-12" onClick={() => this.forgotPassword('')} > Send Email</button>
								</div>
								{this.state.successMsg !== '' ? <div className="success" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.successMsg}</div> : ''}
							</CardBody> 
						)}
						{verifyFP && (
							<CardBody className="padding-20 font-weight-bold">
							<h3>Verify your code</h3>
							<br />
							{!isNewPassReq && (
								<div className="form-group">
									<label>Password Code</label>
									<input name="passcode" type="text" className="form-control" onChange={this.onChange} value={this.state.passcode} />
									<br />
								</div> 
							)}
							<div className="form-group">
								<label>New Password</label>
								<input name="password" type="password" className="form-control" onChange={this.onChange} value={this.state.password} />
								{this.state.error.password}
							</div>
					

							<div className="text-right">
								<button className="button col-12" onClick={() => this.onSubmit()}>Submit</button>
							</div>
							
							{!isNewPassReq && (
								<p className="signup-text">
									Didn't receive a code? {' '}
									<a plain style= {{ cursor :'pointer' }} onClick={() => this.resendforgotPassword('resendcode')}>
										Resend
									</a>
								</p>
							)}


							<br />
							</CardBody> 
						)}

						{verifySignup && ( <Card>
							<CardBody className="padding-20 font-weight-bold">
								{/* <h3>Verification</h3> */}
								{this.state.errorMessage !== '' ? <div className="success" style={{ textAlign: 'center', color: 'red' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.errorMessage}</div> : ''}
								<div className="form-group">
									<label>Code</label>
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
						</Card>
					</div>
					<div className="col-md-4 col-12"></div>
				</div>
				<Footer />
			</>
		)
		return res;
	}
}

const mapStateToProps = (state) => ({ common: state.common })

export default connect(mapStateToProps)(App);