import React from 'react'
import Cookies from 'universal-cookie'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';

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
			id: '1', username: '', password: '', isError: false, isLoad: false,
			error: { username: '', password: '' },
			errorMessage : '',
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
			{ key: 'username', errVal: 'Enter Username' },
			{ key: 'password', errVal: 'Enter Password' },
		]

		let input = datas === undefined ? this.state : datas
		const data = validateFields(input, emptyFields)
		this.setState({ data })
		return data.isError
	}
	onSubmit = () => {
		const data = this.state
		if (!this.onValidation()) {
			this.setState({ isLoad: true })
			this.signin(data);
		}
	}

	signin = (data) => {
		Auth.signIn({
			username: String(data.username),
			password : data.password
		}).then((result) => {
			 console.log("test login",result);
			axios.post("/login", { username: data.username, password: data.password }).then(res => res.data).then(res => {
				if (res.status === 'success') {
					cookies.set('id', res.data.userid);
					cookies.set('email', data.username);
					cookies.set('name', res.data.name);
					cookies.set('workerid', res.data.workerid);
					cookies.set('works', 23476);
					cookies.set('work1', 34589);
					cookies.set('work2', 29574);
					setTimeout(() => {
						this.setState({ isLoad: false })
						window.location.replace('/allhits')
					}, 2000);
				}
				else {
					alert('Invalid Username & Password!')
					this.setState({ isLoad: false })
				}
			})
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
				<div className="background-image3">					</div>
				<Header />
				<div className="row text-left centerscreen" style={{ minHeight: '74vh', marginRight: '0px', marginLeft: '0px' }}>
					{/* <h1 className="tm-site-name logocolor">Freelance <span style={{ color: 'black' }}>Typers</span></h1> */}
					<div className="col-md-4 col-12"></div>
					<div className="col-md-4 col-12">
						<Card>
							<CardBody className="padding-20 font-weight-bold">
								{this.state.errorMessage !== '' ? <div className="error" style={{ textAlign: 'center' }}><i class="fa fa-check" aria-hidden="true"></i> {this.state.errorMessage}</div> : ''}
								<h1>Sign-In</h1>
								<div className="form-group mb-4">
									<label>Email</label>
									<input name="username" type="email" className="form-control" onChange={this.onChange} value={this.state.username} />
									{this.state.error.username}
								</div>
								<div className="form-group mb-4">
									<label>Password</label>
									<a href="#" className="font-weight-600" style={{ float: 'right' }} onClick={() => { this.props.history.push("/Forgotpassword") }}>Forget your password?</a>
									<input name="password" type="password" className="form-control" onChange={this.onChange} value={this.state.password} />
									{this.state.error.password}
								</div>

								<div className="text-right">
									<button className="button col-12 button-login" onClick={this.onSubmit}>Sign-In</button>
								</div>
								<br />
								<div className="font-weight-600"> By continuing, you agree to Freelancetyper's Conditions of Use and Privacy Notice.</div>
								<hr />
								<div className="a-divider a-divider-break">
									<h5>New to Freelancetypers?</h5>			</div>
								<div className="text-right">
									<button className="button col-12 button-login" onClick={() => { this.props.history.push('/Typing') }}>Create your Freelancetypers Account</button>
								</div>
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