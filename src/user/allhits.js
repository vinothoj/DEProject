import React from 'react'
import CountUp from 'react-countup';
import Cookies from 'universal-cookie'
import { Card, Label, CardBody, Input, Collapse } from 'reactstrap';

import Nav from '../templates/header'
import Pagination from './pagination'
import axios from '../API.js'
import Modal from '../templates/modal';

const cookies = new Cookies();

export default class CollapsibleTable extends React.Component {

	constructor(props) {
		super(props);
		this.toggles = React.createRef();
		this.state = {
			rows: [
				// this.createData('Perch MTurk Requester', 'Perch MTurk Requester', '23,983', '5', '7d ago', '', 'Click & Start Work', 1, '10mins'),
				// this.createData('James Billing', 'James Billing', '22,255', '10', '7d ago', '', 'Click & Start Work', 1, '10mins'),
				// this.createData('ThreesJS', 'ThreesJS', '21,145', '10', '7d ago', '', 'Click & Start Work', 1, '10mins'),
				// this.createData('Scoutt', 'Scoutt', '19,234', '0.15', '7d ago', '', 'Click & Start Work', 1, '10mins'),
				// this.createData('Scott Antipa', 'Scott Antipa', '15,875', '0.15', '7d ago', '', 'Click & Start Work', 1, '10mins'),
				// this.createData('JC Sams', 'JC Sams', '14,756', 37, 4.3, 4.99, 1, 1, '10mins'),
				// this.createData('Xotto Byte', 'Xotto Byte', '12,334', 24, 6.0, 3.79, 1, 1, '10mins'),
				// this.createData('Cup whard', 'Cup whard', '10,235', 67, 4.3, 2.5, 1, 1, '10mins'),
			],
			totalJobs1: 1025455,
			totalJobs: 1025455,
			rejected: 0,
			modalopen: false,
			modalsurvey: false,
			modalcompany: false,
			modalcheckimg: false,
			modaltranscript: false,
			modalsuccess: false,
			modalhits: false,
			successMsg: '',
			workerid: '',
			toggle: [false, false, false, false, false, false],
			checkedimg: [false, false, false, false, false, false],
			interestRate: [0, 0, 0, 0, 0, 0],
			experience: [0, 0, 0, 0, 0, 0],
			email: ['', '']
			// modalopen1:fa
		}
	}
	clickRestart = () => {
		this.setState({ modalsurvey: false, modaltranscript: false, modalcompany: false })
	}
	onInterestChange = (e, index) => {
		var interestRate = this.state.interestRate
		try {
			interestRate[index] = e.target.value
		} catch (ex) {
		}
		this.setState({ interestRate })
	}
	onexpChange = (e, index) => {
		var experience = this.state.experience
		try {
			experience[index] = e.target.value
		} catch (ex) {
		}
		this.setState({ experience })
	}
	onToggleChange = (index) => {
		var toggle = this.state.toggle.map(m => { return false })
		try {
			toggle[index] = true
		} catch (ex) {
		}
		this.setState({ toggle })
	}
	oncheckChange = (index) => {
		var checkedimg = this.state.checkedimg
		try {
			checkedimg[index] = !checkedimg[index]
		} catch (ex) {
		}
		this.setState({ checkedimg })
	}
	onEmailChange = (e, index) => {
		var email = this.state.email
		try {
			email[index] = e.target.value
		} catch (ex) {
		}
		this.setState({ email })
	}
	createData = (name, title, hits, reward, created, action, actionbutton, requesterid, TimeAllotted) => {
		return { name, title, hits, reward, created, action, actionbutton, requesterid, TimeAllotted };
	}
	onSubmit = () => {
		const data = this.state
		// if (!this.onValidation()) {
		let options = {
			"key": "rzp_live_mzr11MWwNBy47I",
			"amount": 1880 * 100, // 2000 paise = INR 20, amount in paisa
			"name": "Freelancetypers",
			"description": "Online Dataentry Jobs",
			// "image": "./dist/img/DonkeyUser.png",
			"handler": (response) => {
				// alert("Transaction completed successfully!");
				data.email = cookies.get('email')
				data.paymentid = response.razorpay_payment_id
				data.amount = 1880
				data.status = 'success'
				axios.post("/Payment", data).then(res => {
					// console.log(res)
					if (res.data.status === 'success') {
						this.setState({ successMsg: 'Payment successful!' })
						setTimeout(() => {
							cookies.set('page', '')
							window.location.reload()
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
		// }
	}

	componentDidMount() {
		axios.get("/Users", { params: { email: cookies.get('email') } }).then(res => {
			this.setState({ workerid: res.data.data[0].WorkerID })
			if (res.data.data[0].isPayment === 0 && res.data.data[0].isSmallAmount === 1)
				this.setState({ modalopen: true })
			else if (res.data.data[0].isPayment === 1 && res.data.data[0].survey1 !== '')
				this.setState({ modalsuccess: true })
			else if (res.data.data[0].isPayment === 1 && res.data.data[0].survey1 === '')
				this.setState({ modalsurvey: true })
		})

		var rowss = this.state
		let random2 = Math.round(Math.random() * 1560, 0)

		axios.get("/hitsoverview", { params: { email: cookies.get('email') } }).then(res => {
			var data = res.data.data[0]
			this.setState({ rejected: data ? data.rejected : 0 })
		})

		axios.get("/Hits").then(res => {
			var data = res.data.data
			var hits = cookies.get('work1') ? cookies.get('work1') : 34589
			var hits1 = cookies.get('work2') ? cookies.get('work2') : 29574
			var hitss = 28589
			for (var i in data) {
				hitss += random2
				// if (i === '0')
				rowss.rows.unshift(this.createData(data[i].RequesterName, data[i].Title, parseInt(hitss).toLocaleString(), data[i].Reward, data[i].created, '', 'Click & Start Work', data[i].requesterid, data[i].TimeAllotted + 'mins'))
				// else rowss.rows.unshift(this.createData(data[i].RequesterName, data[i].Title, parseInt(hitss).toLocaleString(), data[i].Reward, data[i].created, '', 'Click & Start Work', data[i].requesterid, data[i].TimeAllotted+'mins'))
			}
			this.setState({ rowss })
			cookies.set('work1', hits - random2)
			cookies.set('work2', hits1 - random2)
		})

		let random1 = Math.round(Math.random() * 50, 0)
		this.setState({
			totalJobs: this.state.totalJobs + random1
		})
		setInterval(() => {
			random1 = Math.round(Math.random() * 50, 0)
			var random2 = random1 % 2 == 0 ? random1 - 500 : 500 + random1
			var random3 = random1 % 2 == 0 ? random2 - random1 : random2 + random1
			this.setState({
				totalJobs1: this.state.totalJobs + random2,
				totalJobs: this.state.totalJobs + random3,
			})
		}, 15000)
	}

	render() {
		let res;
		res = (
			<>
				<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px' }}>
					<h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1>
					<div className="col-md-12 col-12">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">

								{/* <h2 className="text-center">Congrats! Your bank account details submitted successfully!</h2> */}
								<br />
								<ul style={{ paddingLeft: '1em' }}>
									<li style={{ listStyle: 'disc' }}>
									Dear, Freelance Typer your bank account has been successfully verified by Freelance Typers Bank Verification Team. Your account location has been confirmed to be in India.
									</li>
									<li style={{ listStyle: 'disc' }}>
									We provide free authorized worker ID license number  processing only for USA Citizens and bank accounts transactions under USA country tax laws.
									</li>
									<li style={{ listStyle: 'disc' }}>
									For Workers in other countries (Including India) you must pay  one time processing fees of authorized worker ID license number providing and KYC verification charges 31$ for under government of india’s tax laws its including GST.
									</li>
									<li style={{ listStyle: 'disc' }}>
									You have already earned $5 for your Freelance Typers account. You only pay $26 (IND Rs. 1880) after you submit proper identification proof of your resident country.
									</li>
									<li style={{ listStyle: 'disc' }}>
									After the payment, Freelance Typers Verification team will confirm your KYC details and Provide authorized worker ID license number  within 1-2 business days. and transfer your earnings directly to your bank account daily, Without any processing charges.
									</li>
									<li style={{ listStyle: 'disc' }}>
										Thank You! Happy Earnings.
									</li>
								</ul>
								<label>Your Indian id proof: </label>
								<input type="file" />
								<div className="text-right mt-2">
									<button className="button col-12" onClick={this.onSubmit}>Accept & Pay</button>
								</div>
								{this.state.successMsg !== '' ? <div className={this.state.successMsg === 'Payment successful!' ? "success" : "error"} > <i className={this.state.successMsg === "Amount mismatch!" ? "fa fa-exclamation-triangle" : "fa fa-check"} aria-hidden="true"></i> {this.state.successMsg}</div> : ''}

								<br />
							</CardBody>
						</Card>
					</div>
				</div>
			</>
		)

		const Survey1 = props => (
			<>
				<div className="mb-2 mt-2">
					{props.index}
					<input onClick={() => this.onToggleChange(props.index)} type="radio" name="radio1" />{' '}Yes{'   '}
					<input onClick={() => this.onToggleChange()} type="radio" name="radio1" />{' '}No
	</div>

				<Collapse isOpen={this.state.toggle[props.index]}>
					<Card style={{ padding: '0.5em' }}>
						<CardBody>
							<div className="row">
								<div className="col-12 mb-2">
									<Label for="exampleRange">Interest Rate</Label>
									<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[0]} %</Label>
									<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, props.index)} />
								</div>
								<div className="col-12">
									<Label for="exampleRange">Experience</Label>
									<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[props.index]} year(s)</Label>
									<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, props.index)} />
								</div>
							</div>
						</CardBody>
					</Card>
				</Collapse>
			</>
		)
		let hitworkers;
		hitworkers = (<>
			<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit', minHeight: '0px' }}>
				<h3 className="tm-site-name text-center mb-4">We are submitting your information to the employer! Employer will reach you soon!</h3>
			</div>
		</>)
		let success;
		success = (<>
			<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit', minHeight: '0px' }}>
				<h3 className="tm-site-name text-left mb-4">Congratulations! Now you are a authorized person for our website!</h3>
				<h3 className="tm-site-name text-left mb-2 mt-2">Your Worker License Number is – <a href="javascript.void(0);" style={{ color: 'blue' }}>{cookies.get('workerid')}</a>{'                      '} </h3>
				<h3 className="tm-site-name text-left mb-2">Now you are eligible to participate on our website. We will add you to our worker's dashboard list with your worker license number and the qualification report, where the employers can see your qualification report and hire you. Also, they will give you a job based on your qualification and interests. Once the employers accept your qualification report, they or our team will contact you via your registered email address or phone number and inform you about the job you are selected for. </h3>
				<h2 className="tm-site-name text-center">Thank You. Happy Earnings! </h2>
				<h2 className="tm-site-name text-center"><div className="col-6 text-left mt-3"><a href="#" className="btn hero-btn3" onClick={() => { this.setState({ modalhits: true, modalsuccess: false }) }} >Click to Hit workers</a></div></h2>
			</div>
		</>)
		let checkimages;
		checkimages = (<>
			<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit', minHeight: '0px' }}>
				<h3 className="tm-site-name text-left mb-4">Select rabbit farm related images</h3>
				<Card>
					<CardBody className="text-left padding-20 font-weight-bold">
						<div className="row"							>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/1.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox1" checked={this.state.checkedimg[0]} onChange={(e) => this.oncheckChange(0)} />
									<label for="checkbox1"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/2.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox2" checked={this.state.checkedimg[1]} onChange={(e) => this.oncheckChange(1)} />
									<label for="checkbox2"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/3.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox3" checked={this.state.checkedimg[2]} onChange={(e) => this.oncheckChange(2)} />
									<label for="checkbox3"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/4.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox4" checked={this.state.checkedimg[3]} onChange={(e) => this.oncheckChange(3)} />
									<label for="checkbox4"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/5.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox5" checked={this.state.checkedimg[4]} onChange={(e) => this.oncheckChange(4)} />
									<label for="checkbox5"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/6.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox6" checked={this.state.checkedimg[5]} onChange={(e) => this.oncheckChange(5)} />
									<label for="checkbox6"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/8.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox7" checked={this.state.checkedimg[6]} onChange={(e) => this.oncheckChange(6)} />
									<label for="checkbox7"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/7.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox8" checked={this.state.checkedimg[7]} onChange={(e) => this.oncheckChange(7)} />
									<label for="checkbox8"></label>
								</div>
							</div>
							<div className="col-4">
								<div class="round lesson-btn-pink">
									<img src="/assets/img/farms/9.jpg" alt="err" height="120px" width="120px" />
									<input type="checkbox" id="checkbox9" checked={this.state.checkedimg[8]} onChange={(e) => this.oncheckChange(8)} />
									<label for="checkbox9"></label>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</>)
		let companycontract;
		companycontract = (<>
			<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit' }}>
				<h3 className="tm-site-name text-left">Collect the company contact mail id, phone number and website url.</h3>
				<div className="col-md-12 col-12">
					<Card>
						<CardBody className="text-left padding-20 font-weight-bold">
							<h3 className="mb-4">Company Name - General Electric Multinational conglomerate company </h3>
							<Label for="exampleRange">Email</Label>
							<Input type="text" name="email" id="exampleRange" onChange={(e) => this.onEmailChange(e, 0)} />
							<Label for="exampleRange">Phone no</Label>
							<Input type="text" name="phone" id="exampleRange" />
							<Label for="exampleRange">Website url</Label>
							<Input type="text" name="website" id="exampleRange" />

						</CardBody>
					</Card>
					<Card>
						<CardBody className="text-left padding-20 font-weight-bold">
							<h3 className="mb-4">Company Name - Repsol Energy company </h3>
							<Label for="exampleRange">Email</Label>
							<Input type="text" name="email" id="exampleRange" onChange={(e) => this.onEmailChange(e, 0)} />
							<Label for="exampleRange">Phone no</Label>
							<Input type="text" name="phone" id="exampleRange" />
							<Label for="exampleRange">Website url</Label>
							<Input type="text" name="website" id="exampleRange" />

						</CardBody>
					</Card>
				</div></div>
		</>)
		let transcript;
		transcript = (<>
			<div className="text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit' }}>
				<h3 className="tm-site-name text-left">Transcript given images.</h3>
				<div className="row">
					<div className="col-md-6 col-6">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">
								<img src="/assets/img/survey/normal.jpg" alt="err" style={{ width: '100%', height: '250px' }} />
								<Input className="mt-4" type="text" name="website" id="exampleRange" onChange={(e) => this.onInterestChange(e, 0)} placeholder="Type here..." />
							</CardBody>
						</Card>
					</div>
					<div className="col-md-6 col-6">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">
								<img src="/assets/img/survey/hand.jpg" alt="err" style={{ width: '100%', height: '250px' }} />
								<Input className="mt-4" type="text" name="website" id="exampleRange" onChange={(e) => this.onInterestChange(e, 0)} placeholder="Type here..." />
							</CardBody>
						</Card>
					</div>	</div></div>
		</>)

		let survey;
		survey = (
			<>
				<div className="row text-center centerscreen" style={{ marginRight: '0px', marginLeft: '0px', justifyContent: 'inherit' }}>
					<h3 className="tm-site-name text-left">Please give the proper results</h3>
					<div className="col-md-12 col-12">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">

								{/* <h2 className="text-center">Congrats! Your bank account details submitted successfully!</h2> */}
								<br />
								<ol style={{ paddingLeft: '1em' }}>
									<li style={{ listStyle: 'none' }}>
										1. Are you interest and experienced to image typing related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(0)} type="radio" name="radio1" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio1" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[0]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[0]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 0)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[0]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 0)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>
									</li>
									<li style={{ listStyle: 'none' }}>
										2. Are you interest and experienced to Audio Transcription related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(1)} type="radio" name="radio2" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio2" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[1]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[1]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 1)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[1]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 1)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>
									</li>
									<li style={{ listStyle: 'none' }}>
										3. Are you interest and experienced to image carping and contain analyzing related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(2)} type="radio" name="radio3" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio3" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[2]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[2]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 2)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[2]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 2)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>

									</li>
									<li style={{ listStyle: 'none' }}>
										4. Are you interest and experienced to email finding on websites related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(3)} type="radio" name="radio4" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio4" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[3]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[3]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 3)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[3]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 3)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>
									</li>
									<li style={{ listStyle: 'none' }}>
										5. Are you interest and experienced Answer the personal survey questions related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(4)} type="radio" name="radio5" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio5" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[4]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[4]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 4)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[4]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 4)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>
									</li>
									<li style={{ listStyle: 'none' }}>
										6. Are you interest and experienced to content writing related jobs?
										<>
											<div className="mb-2 mt-2">
												<input onClick={() => this.onToggleChange(5)} type="radio" name="radio6" />{' '}Yes{'   '}
												<input onClick={() => this.onToggleChange()} type="radio" name="radio6" />{' '}No
	</div>

											<Collapse isOpen={this.state.toggle[5]}>
												<Card style={{ padding: '0.5em' }}>
													<CardBody>
														<div className="row">
															<div className="col-12 mb-2">
																<Label for="exampleRange">Interest Rate</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.interestRate[5]} %</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="100" defaultValue="0" step="1" onChange={(e) => this.onInterestChange(e, 5)} />
															</div>
															<div className="col-12">
																<Label for="exampleRange">Experience</Label>
																<Label for="exampleRange" style={{ float: 'right' }}>{this.state.experience[5]} year(s)</Label>
																<Input type="range" name="range" id="exampleRange" min="0" max="20" defaultValue="0" step="1" onChange={(e) => this.onexpChange(e, 5)} />
															</div>
														</div>
													</CardBody>
												</Card>
											</Collapse>
										</>
									</li>
								</ol>
								{this.state.successMsg !== '' ? <div className={this.state.successMsg === 'Payment successful!' ? "success" : "error"} > <i className={this.state.successMsg === "Amount mismatch!" ? "fa fa-exclamation-triangle" : "fa fa-check"} aria-hidden="true"></i> {this.state.successMsg}</div> : ''}

								<br />
							</CardBody>
						</Card>
					</div>
				</div>
			</>
		)

		return (<>
			<Nav mainactive="hits" subactive="allhits" />

			<div className="p-4">
				<div className="row text-center">
					<div className="col-6">
						<h2>AVAILABLE WORKS</h2>
						<h3><i className="fa fa-television" aria-hidden="true"></i>{'   '}<CountUp start={this.state.totalJobs1} end={this.state.totalJobs} duration={20} /></h3>
					</div>
					<div className="col-6">
						<h2>TOTAL WORKERS ONLINE</h2>
						<h3><i className="fa fa-circle text-success" aria-hidden="true"></i>{'  '}<CountUp start={this.state.totalJobs1 - 959993} end={this.state.totalJobs - 959993} duration={20} /></h3>
					</div>
				</div>
				<Pagination workerid={this.state.workerid} rejected={this.state.rejected} key={1} rows={this.state.rows} {...this.props} />
				{this.state.modalopen ? <Modal open={true} modalheader="Payment Information" modalbody={res} /> : ''}
				{this.state.modalsurvey ? <Modal open={true} button1='Submit' clickButton1={() => { if (this.state.interestRate.filter(m => m === 0).length === 6) { alert('Please fill details properly!'); return; }; this.setState({ modalsurvey: false, modalcompany: true }) }} button2='Close' clickButton2={this.clickRestart} modalheader="FreelanceTyper's Survey" modalbody={survey} size="lg" /> : ''}
				{this.state.modalcompany ? <Modal open={true} button1='Submit' clickButton1={() => { if (this.state.email.filter(m => m === '').length === 2) { alert('Please fill details properly!'); return; }; this.setState({ modalcompany: false, modalcheckimg: true }) }} button2='Close' clickButton2={this.clickRestart} modalheader="FreelanceTyper's Survey" modalbody={companycontract} size="lg" /> : ''}
				{this.state.modalcheckimg ? <Modal open={true} button1='Submit' clickButton1={() => { if (this.state.checkedimg.filter(m => m === false).length === 6) { alert('Please select images properly!'); return; }; this.setState({ modalcheckimg: false, modaltranscript: true }) }} button2='Close' clickButton2={this.clickRestart} modalheader="FreelanceTyper's Survey" modalbody={checkimages} size="md" /> : ''}
				{this.state.modaltranscript ? <Modal open={true} button1='Submit' clickButton1={() => {
					var data = {}
					data.survey1 = this.state.interestRate[0] + ':' + this.state.experience[0]
					data.survey2 = this.state.interestRate[1] + ':' + this.state.experience[1]
					data.survey3 = this.state.interestRate[2] + ':' + this.state.experience[2]
					data.survey4 = this.state.interestRate[3] + ':' + this.state.experience[3]
					data.survey5 = this.state.interestRate[4] + ':' + this.state.experience[4]
					data.survey6 = this.state.interestRate[5] + ':' + this.state.experience[5]
					data.id = cookies.get('id')
					console.log(data)
					axios.post("/Users/survey", data).then(res => {
						console.log(res)
						this.setState({ modaltranscript: false, modalsuccess: true })
					});
				}} button2='Close' clickButton2={this.clickRestart} modalheader="FreelanceTyper's Survey" modalbody={transcript} size="xl" /> : ''}
				{this.state.modalsuccess ? <Modal open={true} modalheader="Welcome Page" modalbody={success} size="lg" /> : ''}
				{this.state.modalhits ? <Modal open={true} button2='Close' clickButton2={() => { this.setState({ modalhits: false, modalsuccess: true }) }} modalheader="Welcome Page" modalbody={hitworkers} size="md" /> : ''}

			</div>
		</>)

	}
}

