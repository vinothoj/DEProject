import React from 'react'
import Cookies from 'universal-cookie'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'
import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'
import Nav from '../templates/header'

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
		const emptyFields = [
			{ key: 'firstamt', errVal: 'Enter First Amount' },
			{ key: 'secondamt', errVal: 'Enter Second Amount' },
		]

		let input = datas === undefined ? this.state : datas
		const data = validateFields(input, emptyFields)
		this.setState({ data })
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		if (!this.onValidation()) {
			axios.get("/amountcombination", { params: { firstamt: data.firstamt, secondamt: data.secondamt } }).then(res => {
				if (res.data.data && res.data.data.length > 0) {
					axios.post("/updateSmallamount", { email: cookies.get('email') }).then(res => {
						this.setState({ successMsg: 'Amount matched!' })
						setTimeout(() => {
							cookies.set('page', 'payment')
							this.props.history.push({ pathname: '/allhits' })
						}, 3000);
					})
				}
				else {
					this.setState({ successMsg: 'Amount mismatch!' })
				}
			})
			//this.props.history.push('/allhits')
		}
	}

	render() {
		let res;
		res = (
			<>
				<div className="background-image2">					</div>
				{/* <Header /> */}
				<Nav mainactive="" subactive="allhits" />

				<div className="row text-center centerscreen" style={{ minHeight:'74vh',marginRight: '0px', marginLeft: '0px' }}>
					<h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1>
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">

								<h2 className="text-center">Congrats!</h2>
								<br />
								<ul style={{ paddingLeft: '1em' }}>
									<li style={{ listStyle: 'disc' }}>
									Dear Freelance Typer  Your details were submitted successfully! We will transfer two small deposit amounts to your bank account within 1-2  business days, for bank verification purpose.
									</li>
									<li style={{ listStyle: 'disc' }}>
									Once you receive that two payments Kindly look for your bank statement or mobile alerts and enter the two verification deposit amounts on the freelance typers website in the given below boxes.
									</li>
									<li style={{ listStyle: 'disc' }}>
									After you enter the correct two deposit amounts, you can transfer your earnings directly to your bank account.
									</li>
								</ul>
								<br />
								<div className="form-group">
									<label>First Amount</label>
									<input name="firstamt" type="number" className="form-control" onChange={this.onChange} value={this.state.firstamt} maxLength="5" />
									{this.state.error.firstamt}
								</div>
								<div className="form-group">
									<label>Second Amount</label>
									<input name="secondamt" type="number" className="form-control" onChange={this.onChange} value={this.state.secondamt} maxLength="5" />
									{this.state.error.secondamt}
								</div>

								<div className="text-right">
									<button className="button col-12" onClick={this.onSubmit}>Submit</button>
								</div>
								{this.state.successMsg !== '' ? <div className={this.state.successMsg === 'Amount mismatch!' ? "error" : "success"} > <i className={this.state.successMsg === "Amount mismatch!" ? "fa fa-exclamation-triangle" : "fa fa-check"} aria-hidden="true"></i> {this.state.successMsg}</div> : ''}
							</CardBody>
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