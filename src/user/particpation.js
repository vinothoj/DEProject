import React from 'react'
import Cookies from 'universal-cookie'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'

import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'

const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1', name: '', email: '', message: '', isError: false,
			error: { name: '', email: '', message: '' },
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
			{ key: 'name', errVal: 'Enter Name' },
			{ key: 'email', errVal: 'Enter Email ID' },
			{ key: 'message', errVal: 'Enter Message' },
		]
		const emailFields = [
			{ key: 'email', errVal: 'Enter proper Email ID' },
		]

		let input = datas === undefined ? this.state : datas
		const data = validateFields(input, emptyFields, emailFields)
		this.setState({ data })
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		if (!this.onValidation()) {
			axios.post("/contactus", data).then(res => {
				if (res.data.data && res.data.status === "success") {
					this.setState({ successMsg: 'Thanks for contacting us! We will reach you soon!' })
					setTimeout(() => {
						window.location.reload()
					}, 3000);
				}
				else {
					this.setState({ successMsg: 'Something went wrong!' })
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
				<Header />
				<div className="row text-center centerscreen rowfit" style={{minHeight:'74vh'}}>
					{/* <h1 className="tm-site-name logocolor" style={{zIndex:'1'}}>Freelance <span style={{ color: 'white' }}>Typers</span></h1> */}
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
							<CardBody className="text-left padding-20 font-weight-bold">

								<h2 className="text-left">Contact Us</h2>
								<h3 className="text-left">Please fill this form in a decent manner</h3>
								<br />
								<div className="form-group">
									<label>Full name</label>
									<input name="name" type="text" className="form-control" onChange={this.onChange} value={this.state.name} />
									{this.state.error.name}
								</div>
								<div className="form-group">
									<label>Email</label>
									<input name="email" type="text" className="form-control" onChange={this.onChange} value={this.state.email} />
									{this.state.error.email}
								</div>
								<div className="form-group">
									<label>Message</label>
									<textarea name="message" type="text" className="form-control" onChange={this.onChange} value={this.state.message} >
									</textarea>
									{this.state.error.message}
								</div>

								<div className="text-right">
									<button className="button col-12" onClick={this.onSubmit}>Submit</button>
								</div>
								{this.state.successMsg !== '' ? <div className={this.state.successMsg === 'Something went wrong!' ? "error" : "success"} > <i className={this.state.successMsg === "Something went wrong!" ? "fa fa-exclamation-triangle" : "fa fa-check"} aria-hidden="true"></i> {this.state.successMsg}</div> : ''}
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