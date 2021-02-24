import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import Cookies from 'universal-cookie'

import { connect } from 'react-redux'

import axios from '../API.js'
import { validateEmail, clear, validateFields, customValidation } from '../common.js'
import Header from '../templates/landing/commonheader'
import Footer from '../templates/landing/commonfooter'

import { Auth } from 'aws-amplify';
const cookies = new Cookies();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '1', accountname: '', accno: '', ifsc: '', bankname: '', isError: false, isLoad: false,
			error: { accountname: '', accno: '', ifsc: '', bankname: '' },
			successMsg: ''
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
	onSubmit = () => {
		const data = this.state
		data.userid = 1
		data.action = "bank"
		if (this.props.location.state.id)
			data.id = this.props.location.state.id
		else data.id = this.props.location.state

		if (!this.onValidation()) {
			this.setState({ isLoad: true })
			axios.post("/Users/Update", data).then(res => {
				if (res.data.status === 'success')
					setTimeout(() => {
						this.setState({ isLoad: false })
						if (this.props.location.state.id)
							this.signin()
							//window.location.replace('/allhits');
						else this.props.history.push("/addsmallamount")
					}, 3000)
				this.setState({ successMsg: 'Congrats! Your bank account details added successfully!' })
			}).catch(err => {
				console.log(err)
			})
		}
	}

	signin = () => {
		Auth.signIn({
			username: String(cookies.get('email')),
			password : cookies.get('userPassword')
		}).then((result) => {
			 console.log("after login",result);
			 window.location.replace('/allhits');
			// axios.post("/login", { username: data.username, password: data.password }).then(res => res.data).then(res => {
			// 	if (res.status === 'success') {
			// 		cookies.set('id', res.data.userid);
			// 		cookies.set('email', data.username);
			// 		cookies.set('name', res.data.name);
			// 		cookies.set('workerid', res.data.workerid);
			// 		cookies.set('works', 23476);
			// 		cookies.set('work1', 34589);
			// 		cookies.set('work2', 29574);
			// 		setTimeout(() => {
			// 			this.setState({ isLoad: false })
			// 			window.location.replace('/allhits')
			// 		}, 2000);
			// 	}
			// 	else {
			// 		alert('Invalid Username & Password!')
			// 		this.setState({ isLoad: false })
			// 	}
			// })
		}, error => {
			console.log("login error:",error);
			this.setState({
				isLoad: false,
				errorMessage: error.message !== '' ? error.message : 'Something went wrong!',
			});
		});
	};

	render() {
		let res;
		let load = (<>
			<div className="loading-container">
				<div className="loading"></div>
				<div id="">loading</div>
			</div>
		</>)
		res = (
			<>
				{this.state.isLoad ? load : ''}
				<div className="background-image2">					</div>
				<Header />

				<div className="row text-left centerscreen" style={{ minHeight: '74vh', marginRight: '0px', marginLeft: '0px' }}>
					<h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1>
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
							<CardBody className="padding-20 font-weight-bold">

								<h3>Bank Details</h3>
								<br />
								<div className="form-group">
									<label>Account name</label>
									<input name="accountname" type="text" className="form-control" onChange={this.onChange} value={this.state.accountname} />
									{this.state.error.accountname}
								</div>
								<div className="form-group">
									<label>Account number</label>
									<input name="accno" type="text" className="form-control" onChange={this.onChange} value={this.state.accno} />
									{this.state.error.accno}
								</div>
								<div className="form-group">
									<label>IFSC</label>
									<input name="ifsc" type="text" className="form-control" onChange={this.onChange} value={this.state.ifsc} />
									{this.state.error.ifsc}
								</div>
								<div className="form-group">
									<label>Bank name</label>
									<input name="bankname" type="text" className="form-control" onChange={this.onChange} value={this.state.bankname} />
									{this.state.error.bankname}
								</div>

								<div className="text-right">
									<button className="button col-12" onClick={this.onSubmit}>Add Bank Account Details</button>
								</div>
								<br />
								{this.state.successMsg !== '' ? <div className="success" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.successMsg}</div> : ''}

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